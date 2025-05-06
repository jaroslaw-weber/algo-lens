import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import { UniquePathsInput } from "./types"; // New import

export function generateSteps(p: UniquePathsInput) {
  const { m, n } = p;
  const l = new StepLoggerV2();

  // Handle invalid input
  if (m <= 0 || n <= 0) {
    l.simple({ result: 0 });
    l.breakpoint(4); // Go directly to final state
    return l.getSteps();
  }

  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
  l.grid("dp", dp); // Log initial empty DP table using grid

  // Initialize the first column with 1
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
    l.grid("dp", dp, { r: i, c: 0 }); // Use grid, pass pointer directly
    l.breakpoint(1);
  }
  // Initialize the first row with 1
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
    l.grid("dp", dp, { r: 0, c: j }); // Use grid, pass pointer directly
    l.breakpoint(2);
  }

  // Calculate the number of unique paths for each cell
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      const valueAbove = dp[i - 1][j];
      const valueLeft = dp[i][j - 1];
      dp[i][j] = valueAbove + valueLeft;
      // Log state after calculation using grid
      l.grid("dp", dp, { r: i, c: j }, { r: i - 1, c: j }, { r: i, c: j - 1 }); // Pass pointers directly
      l.breakpoint(3);
    }
  }

  // Final result
  const result = dp[m - 1][n - 1];
  // Corrected l.simple call to match signature: simple(value: Record<string, any>)
  l.simple({ result: result });
  l.grid("dp", dp, { r: m - 1, c: n - 1 }); // Use grid, pass pointer directly
  l.breakpoint(4);

  return l.getSteps(); // Return the collected steps
}
