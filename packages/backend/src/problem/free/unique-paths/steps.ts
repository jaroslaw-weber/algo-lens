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
    l.comment = `Initialize the first column of the DP table to 1s. A robot can reach any cell in the first column in only one way: by moving down from the starting cell. So, dp[${i}][0] is set to 1 for each row i.`;
    l.breakpoint(1);
  }
  // Initialize the first row with 1
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
    l.grid("dp", dp, { r: 0, c: j }); // Use grid, pass pointer directly
    l.comment = `Initialize the first row of the DP table to 1s. A robot can reach any cell in the first row in only one way: by moving right from the starting cell. So, dp[0][${j}] is set to 1 for each column j.`;
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
      l.comment = `Calculate the number of unique paths to reach cell dp[${i}][${j}]. A robot can only reach this cell from the cell directly above it (dp[${ i - 1 }][${j}] = ${valueAbove}) or the cell directly to its left (dp[${i}][${j - 1}] = ${valueLeft}). Therefore, the total number of unique paths to reach dp[${i}][${j}] is the sum of the unique paths to these two adjacent cells, which is ${ dp[i][j] }.`;
      l.breakpoint(3);
    }
  }

  // Final result
  const result = dp[m - 1][n - 1];
  // Corrected l.simple call to match signature: simple(value: Record<string, any>)
  l.simple({ result: result });
  l.grid("dp", dp, { r: m - 1, c: n - 1 }); // Use grid, pass pointer directly
  l.comment = `All cells in the DP table have been filled. The total number of unique paths from the top-left corner to the bottom-right corner (cell dp[${m - 1}][${n - 1}]) is ${result}.`;
  l.breakpoint(4);

  return l.getSteps(); // Return the collected steps
}
