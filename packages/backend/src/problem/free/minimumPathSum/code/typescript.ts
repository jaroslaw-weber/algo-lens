// Finds the minimum path sum from the top-left corner to the bottom-right corner of a grid.
export function minPathSum(grid: number[][]): number {
  const m = grid.length; // Number of rows
  const n = grid[0].length; // Number of columns
  // dp[i][j] will store the minimum path sum to reach cell (i, j).
  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

  // Initialize the top-left cell.
  dp[0][0] = grid[0][0];
  //#1 Initialize DP table start

  // Initialize the first row: Can only reach these cells from the left.
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
    //#2 Fill first row
  }

  // Initialize the first column: Can only reach these cells from the top.
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
    //#3 Fill first column
  }

  // Fill the rest of the DP table.
  // For cell (i, j), the minimum path sum is the minimum of the sum from the cell above (i-1, j)
  // and the sum from the cell to the left (i, j-1), plus the value of the current cell grid[i][j].
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      //#4 Calculate minimum path sum for cell (i, j)
    }
  }

  // The result is the minimum path sum to reach the bottom-right cell.
  const result = dp[m - 1][n - 1];
  //#5 Get final result
  return result;
}
