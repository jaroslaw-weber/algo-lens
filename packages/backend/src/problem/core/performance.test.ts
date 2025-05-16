import { ProblemStateCache } from "../../ProblemStateCache";
import { loadProblemWithId } from "./loadProblemWithId";
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
    executionTime: number;
    heapMemory: number;
    rssMemory: number;
  }[] = [];

  for (const problemId of problemIds) {
    it(`should load problem "${problemId}" and measure performance`, async () => {
      const stateCache = new ProblemStateCache();

      const startMemory = process.memoryUsage();
      const startTime = performance.now();

      const loadedProblem = await loadProblemWithId(problemId);

      // Simulate accessing states to trigger caching
      let states = [];
      if (loadedProblem?.testcases) {
        const defaultTestcase = loadedProblem.testcases.find((tc) => tc.isDefault);
        if (defaultTestcase) {
          for (let i = 1; i < 4; i++) {
            const state = stateCache.get(loadedProblem, i);
            const state2 = stateCache.get(loadedProblem, i);
            states.push(state, state2);
          }
        }
      }

      const endTime = performance.now();
      const endMemory = process.memoryUsage();

      const executionTime = endTime - startTime;
      const memoryUsedHeap = endMemory.heapUsed - startMemory.heapUsed;
      const memoryUsedRss = endMemory.rss - startMemory.rss;

      results.push({
        problemId,
        executionTime,
        heapMemory: memoryUsedHeap,
        rssMemory: memoryUsedRss,
      });

      // Optional: Add assertions for individual problems if needed
      // expect(executionTime).toBeLessThan(performanceThreshold);
      // expect(memoryUsedHeap).toBeLessThan(memoryThreshold);
    });
  }

  afterAll(() => {
    console.log("\n--- Performance Results ---");
    console.log("Sorted by Execution Time (ms):");
    results.sort((a, b) => b.executionTime - a.executionTime);
    results.forEach((r) =>
      console.log(
        `${r.problemId}: ${r.executionTime.toFixed(2)} ms, Heap: ${(
          r.heapMemory /
          (1024 * 1024)
        ).toFixed(2)} MB, RSS: ${(r.rssMemory / (1024 * 1024)).toFixed(
          2
        )} MB`
      )
    );

    console.log("\nSorted by Heap Memory (MB):");
    results.sort((a, b) => b.heapMemory - a.heapMemory);
    results.forEach((r) =>
      console.log(
        `${r.problemId}: ${r.executionTime.toFixed(2)} ms, Heap: ${(
          r.heapMemory /
          (1024 * 1024)
        ).toFixed(2)} MB, RSS: ${(r.rssMemory / (1024 * 1024)).toFixed(
          2
        )} MB`
      )
    );

    console.log("\nSorted by RSS Memory (MB):");
    results.sort((a, b) => b.rssMemory - a.rssMemory);
    results.forEach((r) =>
      console.log(
        `${r.problemId}: ${r.executionTime.toFixed(2)} ms, Heap: ${(
          r.heapMemory /
          (1024 * 1024)
        ).toFixed(2)} MB, RSS: ${(r.rssMemory / (1024 * 1024)).toFixed(
          2
        )} MB`
      )
    );
    console.log("---------------------------");
  });
});
