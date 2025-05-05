export function uniquePaths(m: number, n: number): number {
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
    //#1
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
    //#2
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      //#3
    }
  }

  //#4
  return dp[m - 1][n - 1];
}
