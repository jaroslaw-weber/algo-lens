import { Hono } from "hono";
import { getAllProblems } from "./problem/core/list";
import { cloneDeep, pick } from "lodash";

const port = process.env.PORT || 3000;
const app = new Hono();
import { cors } from "hono/cors";
import {
  HashmapVariable,
  HashsetVariable,
  Problem,
  ProblemState,
} from "algo-lens-core";
import { getProblemById } from "./problem/core/utils";

app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.get("/problem", async (c) => {
  const all = await getAllProblems();
  const list = all.map((x) => pick(x, ["id", "title", "difficulty", "emoji"]));
  return c.json(list);
});

app.get("/problem/:id", async (c) => {
  const id = c.req.param("id");

  if (!id) {
    return c.json(
      {
        error: "No id provided",
      },
      400
    );
  }
  const problem = await getProblemById(id!);
  if (!problem) {
    return c.json(
      {
        error: "Problem not found",
      },
      404
    );
  }
  const rendered = pick(problem, [
    "id",
    "title",
    "difficulty",
    "code",
    "url",
    "tags",
    "metadata",
    "testcases",
  ]);
  if (Object.keys(rendered).length === 0) {
    throw new Error("invalid problem: " + problem);
  }
  return c.json(rendered);
});

class ProblemStateCache {
  private cache = new Map<string, ProblemState>();
  private size = new Map<string, number>();
  private testcaseIndex = new Map<string, number>();

  getKey(problem: Problem<any, any>, step: number, testcaseIndex: number = 0): string {
    return `${problem.id}-${testcaseIndex}-${step}`;
  }

  get(problem: Problem<any, any>, step: number, testcaseIndex: number = 0): ProblemState | undefined {
    const key = this.getKey(problem, step, testcaseIndex);
    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }
    this.cacheProblem(problem, testcaseIndex);
    return this.cache.get(key);
  }

  private cacheProblem(problem: Problem<any, any>, testcaseIndex: number = 0) {
    const { testcases } = problem;
    if (!testcases) {
      throw new Error("no testcases found for problem: " + problem.id!);
    }
    if (testcases.length === 0) {
      throw new Error("no testcases found for problem: " + problem.id!);
    }
    
    // Use the specified testcase index or default to the first one if out of bounds
    const actualIndex = testcaseIndex >= 0 && testcaseIndex < testcases.length 
      ? testcaseIndex 
      : 0;
      
    const testcase = testcases[actualIndex].input;
    console.log("testcase: ", testcase, "index:", actualIndex);
    
    const states = problem.func(testcase);
    for (let i = 0; i < states.length; i++) {
      const state = states[i];
      const key2 = this.getKey(problem, i + 1, actualIndex);
      this.cache.set(key2, state);
    }
    
    const sizeKey = `${problem.id!}-${actualIndex}`;
    this.size.set(sizeKey, states.length);
    this.testcaseIndex.set(problem.id!, actualIndex);
  }

  getSize(problem: Problem<any, any>, testcaseIndex: number = 0): number | undefined {
    const sizeKey = `${problem.id!}-${testcaseIndex}`;
    const size = this.size.get(sizeKey);
    if (!size) {
      this.cacheProblem(problem, testcaseIndex);
    }
    return this.size.get(sizeKey);
  }
  
  setTestcaseIndex(problemId: string, index: number) {
    this.testcaseIndex.set(problemId, index);
    // Clear cache for this problem to force recalculation with new testcase
    const keysToDelete: string[] = [];
    this.cache.forEach((_, key) => {
      if (key.startsWith(problemId)) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => this.cache.delete(key));
    
    // Clear size cache for this problem
    const sizeKeysToDelete: string[] = [];
    this.size.forEach((_, key) => {
      if (key.startsWith(problemId)) {
        sizeKeysToDelete.push(key);
      }
    });
    sizeKeysToDelete.forEach(key => this.size.delete(key));
  }
  
  getTestcaseIndex(problemId: string): number {
    return this.testcaseIndex.get(problemId) || 0;
  }
}

const stateCache = new ProblemStateCache();

// Add endpoint to set testcase index
app.get("/problem/:problemId/testcase/:index", async (c) => {
  const problemId = c.req.param("problemId");
  const index = parseInt(c.req.param("index"));
  
  const problem = await getProblemById(problemId!);
  if (!problem) {
    return c.json({ error: "Problem not found" }, 404);
  }
  
  // Validate testcase index
  if (index < 0 || !problem.testcases || index >= problem.testcases.length) {
    return c.json({ error: "Invalid testcase index" }, 400);
  }
  
  stateCache.setTestcaseIndex(problemId!, index);
  return c.json({ success: true, testcaseIndex: index });
});

// Get current testcase index
app.get("/problem/:problemId/testcase", async (c) => {
  const problemId = c.req.param("problemId");
  
  const problem = await getProblemById(problemId!);
  if (!problem) {
    return c.json({ error: "Problem not found" }, 404);
  }
  
  const index = stateCache.getTestcaseIndex(problemId!);
  return c.json({ testcaseIndex: index });
});

app.get("/problem/:problemId/state/:step", async (c) => {
  const problemId = c.req.param("problemId");
  const step = parseInt(c.req.param("step"));
  
  // Get testcase index from query param or use default
  const testcaseIndex = c.req.query("testcaseIndex") 
    ? parseInt(c.req.query("testcaseIndex")) 
    : stateCache.getTestcaseIndex(problemId!);

  const problem = await getProblemById(problemId!);
  if (!problem) {
    throw new Error(`Problem not found: ${problemId} `);
  }

  const state = stateCache.get(problem!, step, testcaseIndex);

  const preserialized = preserialize(state!);
  return c.json(preserialized);
});

function preserialize(state: ProblemState): any {
  const result = cloneDeep(state);
  for (const v of result.variables) {
    //convert Map variable to Record
    const hm = v as HashmapVariable;
    if (hm.value instanceof Map) {
      hm.value = Array.from(hm.value.entries());
    }
    //convert Set variable to Array
    const set = v as HashsetVariable;
    if (set.value instanceof Set) {
      set.value = Array.from(set?.value);
    }
  }

  return result;
}

app.get("/problem/:problemId/size", async (c) => {
  const problemId = c.req.param("problemId");
  
  // Get testcase index from query param or use default
  const testcaseIndex = c.req.query("testcaseIndex") 
    ? parseInt(c.req.query("testcaseIndex")) 
    : stateCache.getTestcaseIndex(problemId!);

  const problem = await getProblemById(problemId!);
  if (!problem) {
    return c.json({ error: "Problem not found" }, 404);
  }

  const size = stateCache.getSize(problem!, testcaseIndex);

  return c.json({ size });
});

export default {
  port: port,
  fetch: app.fetch,
};
