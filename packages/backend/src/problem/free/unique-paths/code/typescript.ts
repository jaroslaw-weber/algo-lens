// Calculates the number of unique paths a robot can take to reach the bottom-right corner
// of an m x n grid, starting from the top-left corner, moving only right or down.
export function uniquePaths(m: number, n: number): number {
  // dp[i][j] will store the number of unique paths to reach cell (i, j).
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  // Initialize the first column: There's only 1 way to reach any cell in the first column (by moving down).
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
    //#1 Initialize first column
  }
  // Initialize the first row: There's only 1 way to reach any cell in the first row (by moving right).
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
    //#2 Initialize first row
  }

  // Fill the rest of the DP table.
  // The number of paths to reach cell (i, j) is the sum of paths to reach the cell above (i-1, j)
  // and the paths to reach the cell to the left (i, j-1).
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      //#3 Calculate paths for cell (i, j)
    }
  }

  // The result is the number of unique paths to reach the bottom-right cell (m-1, n-1).
  //#4 Return result from bottom-right cell
  return dp[m - 1][n - 1];
}
