export function editDistance(s1: string, s2: string): number {
  const m = s1.length,
    n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
    //#1
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
    //#2
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
      //#3
    }
  }

  //#4
  return dp[m][n];
}
