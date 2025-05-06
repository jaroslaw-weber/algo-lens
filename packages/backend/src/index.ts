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
  const tag = c.req.query("tag"); // Get the tag query parameter
  const all = await getAllProblems();

  // Filter problems if a tag is provided
  const filteredProblems = tag
    ? all.filter(p => p.tags && p.tags.includes(tag))
    : all;

  // Map the filtered list to the desired output format
  const list = filteredProblems.map((x) => pick(x, ["id", "title", "difficulty", "emoji"]));
  return c.json(list);
});

// New route for getting a random problem
app.get("/problem/random", async (c) => {
  try {
    const all = await getAllProblems();
    if (!all || all.length === 0) {
      console.error("No problems found when fetching for /problem/random");
      return c.json({ error: "No problems available" }, 500);
    }

    const randomProblem = all[Math.floor(Math.random() * all.length)];
    const result = pick(randomProblem, ["id", "title", "difficulty", "emoji"]);

    // Ensure we actually found a problem and picked some fields
    if (!result || !result.id) {
        console.error("Failed to select a random problem or pick required fields", { randomProblem, result });
        return c.json({ error: "Failed to retrieve random problem details" }, 500);
    }

    return c.json(result);
  } catch (error) {
    console.error("Error fetching random problem:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
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
  ]);
  if (Object.keys(rendered).length === 0) {
    throw new Error("invalid problem: " + problem);
  }
  return c.json(rendered);
});

class ProblemStateCache {
  private cache = new Map<string, ProblemState>();

  private size = new Map<string, number>();

  getKey(problem: Problem<any, any>, step: number): string {
    return problem.id + "-" + step;
  }

  get(problem: Problem<any, any>, step: number): ProblemState | undefined {
    const key = this.getKey(problem, step);
    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }
    this.cacheProblem(problem);
    return this.cache.get(key);
  }

  private cacheProblem(problem: Problem<any, any>) {
    const { testcases } = problem;
    if (!testcases) {
      throw new Error("no testcases found for problem: " + problem.id!);
    }
    if (testcases.length === 0) {
      throw new Error("no testcases found for problem: " + problem.id!);
    }
    const testcase = testcases[2].input;
    console.log("testcase: ", testcase);
    const states = problem.func(testcase);
    for (let i = 0; i < states.length; i++) {
      const state = states[i];
      const key2 = this.getKey(problem, i + 1);
      this.cache.set(key2, state);
    }
    this.size.set(problem.id!, states.length);
  }

  getSize(problem: Problem<any, any>): number | undefined {
    const size = this.size.get(problem.id!);
    if (!size) {
      this.cacheProblem(problem);
    }
    return this.size.get(problem.id!);
  }
}

const stateCache = new ProblemStateCache();
app.get("/problem/:problemId/state/:step", async (c) => {
  const problemId = c.req.param("problemId");
  const step = parseInt(c.req.param("step"));

  const problem = await getProblemById(problemId!);
  if (!problem) {
    throw new Error(`Problem not found: ${problemId} `);
  }

  const state = stateCache.get(problem!, step);

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

  const problem = await getProblemById(problemId!);

  const size = stateCache.getSize(problem!);

  return c.json({ size });
});

export default {
  port: port,
  fetch: app.fetch,
};
