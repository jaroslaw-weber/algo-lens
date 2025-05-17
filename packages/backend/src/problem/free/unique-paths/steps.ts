import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import { UniquePathsInput } from "./types"; // New import

export function generateSteps(p: UniquePathsInput) {
  const { m, n } = p;
  const l = new StepLoggerV2();
  l.groupOptions.set("pointer", { min: 0, max: m * n });

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
    l.grid("dp", dp, { r: i, c: 0 , label: "base"}); // Use grid, pass pointer directly
    l.comment = `Initialize the first column of the DP table to 1s. A robot can reach any cell in the first column in only one way: by moving down from the starting cell. The value 1 represents the number of unique paths to reach that cell.`;
    l.breakpoint(1);
  }
  // Initialize the first row with 1
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
    l.grid("dp", dp, { r: 0, c: j, label:"base"}); // Use grid, pass pointer directly
    l.comment = `Initialize the first row of the DP table to 1s. A robot can reach any cell in the first row in only one way: by moving right from the starting cell. The value 1 represents the number of unique paths to reach that cell.`;
    l.breakpoint(2);
  }

  // Calculate the number of unique paths for each cell
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      const valueAbove = dp[i - 1][j];
      const valueLeft = dp[i][j - 1];
      const current = valueAbove + valueLeft;
      dp[i][j] = current;
      // Log state after calculation using grid
      // HIDE_START
      l.grid(
        "dp",
        dp,
        { r: i, c: j, label: "current", dir: "bottom" },
        { r: i - 1, c: j, label: "valueAbove", dir: "right" },
        { r: i, c: j - 1, label: "valueLeft", dir: "left" }
      ); // Pass pointers directly

      l.group("pointer", {
        valueAbove,
        valueLeft,
        current,
      });
      // HIDE_END
      l.comment = `Calculate the number of unique paths to reach the current cell. A robot can only reach this cell from the cell directly above it (with ${valueAbove} unique paths) or the cell directly to its left (with ${valueLeft} unique paths). Therefore, the total number of unique paths to reach the current cell is the sum of the unique paths to these two adjacent cells, which is ${dp[i][j]}.`;
      l.breakpoint(3);
    }
  }

  // Final result
  const result = dp[m - 1][n - 1];
  // Corrected l.simple call to match signature: simple(value: Record<string, any>)
  l.simple({ result: result });
  l.grid("dp", dp, { r: m - 1, c: n - 1, label: "result" }); // Use grid, pass pointer directly
  l.comment = `All cells in the DP table have been filled. The total number of unique paths from the top-left corner to the bottom-right corner is ${result}.`;
  l.breakpoint(4);

  return l.getSteps(); // Return the collected steps
}
