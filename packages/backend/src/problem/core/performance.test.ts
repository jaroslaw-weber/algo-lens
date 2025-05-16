import { ProblemStateCache } from "../../ProblemStateCache";
import { loadProblemWithId } from "./loadProblemWithId";
import { describe, it, expect } from "bun:test";

describe("loadProblemWithId", () => {
  it("should load all problem steps and measure performance", async () => {
    const stateCache = new ProblemStateCache();
    const problemId = "maximum-subarray"; // Using a known problem ID
    const loadedProblem = await loadProblemWithId(problemId);

    expect(loadedProblem).toBeTruthy();
    expect(loadedProblem?.testcases).toBeTruthy();

    const defaultTestcase = loadedProblem!.testcases.find((tc) => tc.isDefault);
    expect(defaultTestcase).toBeTruthy();

    let states = [];

    const startTime = performance.now();
    for (let i = 1; i < 4; i++) {
      const state = stateCache.get(loadedProblem!, i);
      const state2 = stateCache.get(loadedProblem!, i);
      states.push(state, state2);
    }
    const endTime = performance.now();

    expect(states).toBeTruthy();
    expect(states.length).toBeGreaterThan(0);

    const executionTime = endTime - startTime;
    console.log(
      `Loading steps (with cache simulation) for '${problemId}' took ${executionTime} ms`
    );

    // Add a performance assertion (adjust the threshold as needed)
    const performanceThreshold = 50; // milliseconds (adjusted threshold for cached loading)
    expect(executionTime).toBeLessThan(performanceThreshold);
  });
});
