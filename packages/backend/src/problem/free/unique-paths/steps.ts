import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
// Removed ProblemState, as2dArray, asArray, asSimpleValue, asValueGroup
import { UniquePathsInput } from "./types"; // New import

export function generateSteps(p: UniquePathsInput) { // Renamed function, added export, Return type inferred
  const { m, n } = p;
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2

  // Handle invalid input
  if (m <= 0 || n <= 0) {
    l.simple("m", m, { group: "input" });
    l.simple("n", n, { group: "input" });
    l.simple("result", 0, { group: "result" });
    l.breakpoint(4); // Go directly to final state
    return l.getSteps();
  }

  l.simple("m", m, { group: "input" });
  l.simple("n", n, { group: "input" });

  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
  l.array2d("dp", dp, undefined, { group: "dpTable", label: "DP Table (Initial)" }); // Log initial empty DP table

  // Initialize the first column with 1
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
    l.simple("i", i, { group: "loopIndices" });
    l.array2d("dp", dp, [{ r: i, c: 0 }], { group: "dpTable" });
    l.breakpoint(1);
  }
   l.simple("i", undefined, { group: "loopIndices" }); // Reset i

  // Initialize the first row with 1
  // Note: dp[0][0] is already 1 from the previous loop, start j from 1 if needed
  // Or let it run from 0, overwriting dp[0][0] with 1 again, which is fine.
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
    l.simple("j", j, { group: "loopIndices" });
    l.array2d("dp", dp, [{ r: 0, c: j }], { group: "dpTable" });
    l.breakpoint(2);
  }
  l.simple("j", undefined, { group: "loopIndices" }); // Reset j


  // Calculate the number of unique paths for each cell
  for (let i = 1; i < m; i++) {
     l.simple("i", i, { group: "loopIndices" });
    for (let j = 1; j < n; j++) {
      l.simple("j", j, { group: "loopIndices" });
      const valueAbove = dp[i - 1][j];
      const valueLeft = dp[i][j - 1];
      dp[i][j] = valueAbove + valueLeft;
      // Log state after calculation
      l.array2d("dp", dp, [{ r: i, c: j }, { r: i - 1, c: j }, { r: i, c: j - 1 }], { group: "dpTable" });
      l.breakpoint(3);
    }
     l.simple("j", undefined, { group: "loopIndices" }); // Reset inner loop index
  }
  l.simple("i", undefined, { group: "loopIndices" }); // Reset outer loop index


  // Final result
  const result = dp[m - 1][n - 1];
  l.simple("result", result, { group: "result" });
  l.array2d("dp", dp, [{ r: m - 1, c: n - 1 }], { group: "dpTable" }); // Highlight final result cell
  l.breakpoint(4);

  return l.getSteps(); // Return the collected steps
}
