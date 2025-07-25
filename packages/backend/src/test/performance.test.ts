import { ProblemStateCache } from "../cache/ProblemStateCache.js";
import { loadProblemWithId } from "../problem/core/load.js";
import { describe, it, expect, afterAll } from "bun:test";

const problemIds = [
  "3sum",
  "bestTimeToBuyAndSellStocks",
  "climbingStairs",
  "coinChange",
  "container-with-most-water",
  "contains-duplicate",
  "countingBits",
  "course-schedule",
  "editDistance",
  "houseRobber",
  "insert-interval",
  "longestIncreasingSubsequence",
  "maximum-subarray",
  "merge-intervals",
  "minimumPathSum",
  "missing-number",
  "non-overlapping-intervals",
  "number-of-1-bits",
  "number-of-islands",
  "pacific-atlantic-water-flow",
  "product-of-array-except-self",
  "reverse-list",
  "same-tree",
  "search-in-rotated-sorted-array",
  "set-matrix-zeroes",
  "sum-of-two-integers",
  "two-sum",
  "unique-paths",
  "word-break",
];

describe("Problem Loading Performance", () => {
  const results: {
    problemId: string;
    loadExecutionTime: number;
    secondLoadExecutionTime: number; // Added for second load performance
    stateExecutionTime: number;
    heapMemory: number;
    rssMemory: number;
  }[] = [];

  for (const problemId of problemIds) {
    it(`should load problem "${problemId}" and measure performance`, async () => {
      const stateCache = new ProblemStateCache();

      const startMemory = process.memoryUsage();
      const startTime = performance.now();

      const loadedProblem = await loadProblemWithId(problemId);

      const loadEndTime = performance.now();
      const loadExecutionTime = loadEndTime - startTime;

      // Measure performance of the second load
      const secondLoadStartTime = performance.now();
      await loadProblemWithId(problemId); // Load the same problem again
      const secondLoadEndTime = performance.now();
      const secondLoadExecutionTime = secondLoadEndTime - secondLoadStartTime;

      // Simulate accessing states to trigger caching
      let states = [];
      const stateStartTime = performance.now();
      if (loadedProblem?.testcases) {
        const defaultTestcase = loadedProblem.testcases.find(
          (tc) => tc.isDefault
        );
        if (defaultTestcase) {
          for (let i = 1; i < 4; i++) {
            const state = stateCache.get(
              loadedProblem,
              defaultTestcase.input,
              i
            );
            const state2 = stateCache.get(
              loadedProblem,
              defaultTestcase.input,
              i
            );
            states.push(state, state2);
          }
        }
      }
      const stateEndTime = performance.now();
      const stateExecutionTime = stateEndTime - stateStartTime;

      const endTime = performance.now();
      const endMemory = process.memoryUsage();

      const memoryUsedHeap = endMemory.heapUsed - startMemory.heapUsed;
      const memoryUsedRss = endMemory.rss - startMemory.rss;

      results.push({
        problemId,
        loadExecutionTime,
        secondLoadExecutionTime, // Added to results
        stateExecutionTime,
        heapMemory: memoryUsedHeap,
        rssMemory: memoryUsedRss,
      });

      // Optional: Add assertions for individual problems if needed
      // expect(loadExecutionTime).toBeLessThan(performanceThreshold);
      // expect(stateExecutionTime).toBeLessThan(performanceThreshold);
      // expect(memoryUsedHeap).toBeLessThan(memoryThreshold);
    });
  }

  afterAll(() => {
    for (const r of results) {
      //convert to MB
      r.heapMemory = r.heapMemory / (1024 * 1024); // Convert bytes to MB
      r.rssMemory = r.rssMemory / (1024 * 1024); // Convert bytes to MB
    }

    console.log("\n--- Performance Results ---");
    console.log("Sorted by Total Execution Time (ms):");
    results.sort(
      (a, b) =>
        b.loadExecutionTime +
        b.secondLoadExecutionTime + // Include second load time in total
        b.stateExecutionTime -
        (a.loadExecutionTime + a.secondLoadExecutionTime + a.stateExecutionTime) // Include second load time in total
    );
    console.table(results);

    console.log("\nSorted by First Load Execution Time (ms):"); // Updated label
    results.sort((a, b) => b.loadExecutionTime - a.loadExecutionTime);
    console.table(results);

    console.log("\nSorted by Second Load Execution Time (ms):"); // Added for second load
    results.sort(
      (a, b) => b.secondLoadExecutionTime - a.secondLoadExecutionTime
    ); // Sort by second load time
    console.table(results);

    console.log("\nSorted by State Execution Time (ms):");
    results.sort((a, b) => b.stateExecutionTime - a.stateExecutionTime);

    console.table(results);

    console.log("\nSorted by Heap Memory (MB):");
    results.sort((a, b) => b.heapMemory - a.heapMemory);

    console.table(results);

    console.log("\nSorted by RSS Memory (MB):");
    results.sort((a, b) => b.rssMemory - a.rssMemory);

    console.table(results);
    // console.log("---------------------------");
  });
});
