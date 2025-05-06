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
  ]);
  if (Object.keys(rendered).length === 0) {
    throw new Error("invalid problem: " + problem);
  }
  return c.json(rendered);
});

class ProblemStateCache {
  // Cache structure: Map<problemId, Map<testCaseIndex, Map<step, ProblemState>>>
  private cache = new Map<string, Map<number, Map<number, ProblemState>>>();
  // Size cache structure: Map<problemId, Map<testCaseIndex, size>>
  private size = new Map<string, Map<number, number>>();

  // Generates a cache key for a specific step of a specific test case for a problem.
  getKey(problemId: string, testCaseIndex: number, step: number): string {
    return `${problemId}-${testCaseIndex}-${step}`;
  }

  // Retrieves a state from the cache or computes and caches it if not present.
  get(problem: Problem<any, any>, testCaseIndex: number, step: number): ProblemState | undefined {
    const problemCache = this.cache.get(problem.id);
    const testCaseCache = problemCache?.get(testCaseIndex);
    const cachedState = testCaseCache?.get(step);

    if (cachedState) {
      return cachedState;
    }

    // If state is not cached, compute and cache states for the entire test case.
    this.cacheProblemTestCase(problem, testCaseIndex);

    // Attempt to retrieve the state again after caching.
    return this.cache.get(problem.id)?.get(testCaseIndex)?.get(step);
  }

  // Computes and caches all states for a given test case of a problem.
  private cacheProblemTestCase(problem: Problem<any, any>, testCaseIndex: number) {
    const { testcases, func, id: problemId } = problem;
    if (!testcases || testcases.length === 0) {
      // It's valid for a problem to initially have no test cases, log a warning.
      console.warn(`No testcases found for problem: ${problemId}`);
      // Ensure cache entries exist to prevent errors later
      if (!this.cache.has(problemId)) this.cache.set(problemId, new Map());
      if (!this.size.has(problemId)) this.size.set(problemId, new Map());
       if (!this.cache.get(problemId)!.has(testCaseIndex)) this.cache.get(problemId)!.set(testCaseIndex, new Map());
       if (!this.size.get(problemId)!.has(testCaseIndex)) this.size.get(problemId)!.set(testCaseIndex, 0); // Size is 0
      return; // Nothing to cache
    }
    if (testCaseIndex < 0 || testCaseIndex >= testcases.length) {
      throw new Error(`Invalid testCaseIndex ${testCaseIndex} for problem ${problemId} with ${testcases.length} testcases.`);
    }

    const testcase = testcases[testCaseIndex];
    if (!testcase || testcase.input === undefined) {
       // Log error instead of throwing, allows API to return 404 or similar
       console.error(`Test case or test case input is undefined at index ${testCaseIndex} for problem ${problemId}`);
       // Set size to 0 for this test case index to avoid repeated calculation attempts
        if (!this.size.has(problemId)) this.size.set(problemId, new Map());
        this.size.get(problemId)!.set(testCaseIndex, 0);
       return; // Cannot generate states
    }

    console.log(`Caching states for problem ${problemId}, testCaseIndex ${testCaseIndex}`);
    let states: ProblemState[] = [];
    try {
        states = func(testcase.input);
    } catch (error: any) {
        console.error(`Error executing problem function for ${problemId}, testCase ${testCaseIndex}: ${error.message}`);
        // Set size to 0 and return to prevent caching partial/incorrect data
        if (!this.size.has(problemId)) this.size.set(problemId, new Map());
        this.size.get(problemId)!.set(testCaseIndex, 0);
        return;
    }


    if (!this.cache.has(problemId)) {
      this.cache.set(problemId, new Map());
    }
    const problemCache = this.cache.get(problemId)!;

    if (!problemCache.has(testCaseIndex)) {
        problemCache.set(testCaseIndex, new Map());
    }
    const testCaseCache = problemCache.get(testCaseIndex)!;
    testCaseCache.clear(); // Clear previous states if recaching

    states.forEach((state, index) => {
      testCaseCache.set(index + 1, state); // Steps are 1-based
    });

    // Cache the size
    if (!this.size.has(problemId)) {
      this.size.set(problemId, new Map());
    }
    this.size.get(problemId)!.set(testCaseIndex, states.length);
  }


  // Retrieves the size (number of steps) for a specific test case of a problem.
  getSize(problem: Problem<any, any>, testCaseIndex: number): number | undefined {
     // Validate index
     if (!problem.testcases || testCaseIndex < 0 || testCaseIndex >= problem.testcases.length) {
          console.warn(`getSize called with invalid index ${testCaseIndex} for problem ${problem.id}`);
          return undefined; // Or 0, depending on desired behavior for invalid index
     }

     const problemSizeCache = this.size.get(problem.id);
     const size = problemSizeCache?.get(testCaseIndex);

     if (size === undefined) {
       // If size is not cached, compute and cache the states (which also caches size).
       console.log(`Size not cached for ${problem.id}, testCase ${testCaseIndex}. Caching now.`);
       this.cacheProblemTestCase(problem, testCaseIndex);
       // Attempt to retrieve the size again.
       return this.size.get(problem.id)?.get(testCaseIndex);
     }
     return size;
  }

  // Retrieves the size for the default test case of a problem.
  getDefaultSize(problem: Problem<any, any>): number | undefined {
    if (!problem.testcases || problem.testcases.length === 0) {
        console.warn(`Problem ${problem.id} has no test cases.`);
        return 0; // No test cases means size 0
    }

    let defaultTestCaseIndex = problem.testcases.findIndex(tc => tc.isDefault);
    // Use index 0 if no default is explicitly set
    const indexToUse = defaultTestCaseIndex !== -1 ? defaultTestCaseIndex : 0;

    // Ensure the index is valid (it should be, given the checks above, but belt-and-suspenders)
    if (indexToUse < 0 || indexToUse >= problem.testcases.length) {
        console.error(`Calculated default index ${indexToUse} is out of bounds for problem ${problem.id}. Using 0.`);
        // Fallback to 0 if the array is somehow empty despite earlier check
        return this.getSize(problem, 0);
    }

    return this.getSize(problem, indexToUse);
  }
}

const stateCache = new ProblemStateCache();
// Updated route: /problem/:problemId/testcase/:testCaseIndex/state/:step
app.get("/problem/:problemId/testcase/:testCaseIndex/state/:step", async (c) => {
  const problemId = c.req.param("problemId");
  const testCaseIndex = parseInt(c.req.param("testCaseIndex"));
  const step = parseInt(c.req.param("step"));

  if (isNaN(testCaseIndex) || testCaseIndex < 0) {
    return c.json({ error: "Invalid testCaseIndex" }, 400);
  }
  if (isNaN(step) || step <= 0) { // Steps are 1-based
    return c.json({ error: "Invalid step number" }, 400);
  }

  const problem = await getProblemById(problemId!);
  if (!problem) {
    return c.json({ error: `Problem not found: ${problemId}` }, 404);
  }

   // Check if testcases array exists and is not empty
  if (!problem.testcases || problem.testcases.length === 0) {
    return c.json({ error: `No test cases available for problem ${problemId}` }, 404);
  }


  if (testCaseIndex >= problem.testcases.length) {
     return c.json({ error: `testCaseIndex ${testCaseIndex} out of bounds for problem ${problemId}` }, 400);
  }

  try {
    const state = stateCache.get(problem, testCaseIndex, step);
    if (!state) {
      // Check if the step is simply out of bounds vs. an error during caching
       const size = stateCache.getSize(problem, testCaseIndex);
       if (size !== undefined && step > size) {
            return c.json({ error: `Step ${step} out of bounds for test case ${testCaseIndex} (size: ${size})` }, 404);
       } else {
           // Could indicate an issue during caching or invalid test case input
           console.error(`State not found for problem ${problemId}, testcase ${testCaseIndex}, step ${step}, but size is ${size}. Potential caching issue.`);
           return c.json({ error: `State not found for step ${step} in test case ${testCaseIndex}` }, 404); // Keep 404, but log potential issue
       }
    }
    const preserialized = preserialize(state);
    return c.json(preserialized);
  } catch (error: any) {
     console.error(`Error fetching state for problem ${problemId}, testcase ${testCaseIndex}, step ${step}: ${error.message}`);
     // Return a generic server error
     return c.json({ error: "Internal server error while fetching state" }, 500);
  }
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
  if (!problem) {
     return c.json({ error: `Problem not found: ${problemId}` }, 404);
  }

  try {
    const testCaseIndexQuery = c.req.query("testCaseIndex");
    let size: number | undefined;

    if (testCaseIndexQuery !== undefined) {
      const testCaseIndex = parseInt(testCaseIndexQuery);
      if (!isNaN(testCaseIndex) && testCaseIndex >= 0) {
        // If a valid testCaseIndex is provided, get the size for that specific index
        size = stateCache.getSize(problem, testCaseIndex);
        if (size === undefined) {
           console.error(`Could not determine size for problem ${problemId}, testCaseIndex ${testCaseIndex}.`);
           // Explicitly return 500 if getSize fails for a specific index
           return c.json({ error: `Could not determine size for test case index ${testCaseIndex}` }, 500);
        }
      } else {
         // Invalid testCaseIndex query param
         return c.json({ error: `Invalid testCaseIndex query parameter: ${testCaseIndexQuery}` }, 400);
      }
    } else {
      // If no testCaseIndex is provided, get the size for the default test case
      size = stateCache.getDefaultSize(problem);
      if (size === undefined) {
         console.error(`Could not determine default size for problem ${problemId}.`);
          // Explicitly return 500 if getDefaultSize fails
        return c.json({ error: "Could not determine size for the default test case" }, 500); // Keep 500 for default case failure
      }
    }

    // If size is determined successfully (either specific or default)
    return c.json({ size });
  } catch (error: any) {
     console.error(`Error getting default size for problem ${problemId}: ${error.message}`);
     return c.json({ error: "Internal server error while calculating size" }, 500);
  }

});

export default {
  port: port,
  fetch: app.fetch,
};
