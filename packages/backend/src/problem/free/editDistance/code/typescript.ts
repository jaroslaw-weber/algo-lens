// Calculates the minimum number of single-character edits (insertions, deletions, or substitutions)
// required to change one word into the other.
export function editDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  // dp[i][j] will contain the edit distance between the first i characters of s1 and the first j characters of s2.
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // Initialize the first column: edit distance from prefix of s1 to empty string is i deletions.
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i; // Cost of deleting i characters from s1
    //#1
  }
  // Initialize the first row: edit distance from empty string to prefix of s2 is j insertions.
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j; // Cost of inserting j characters into s1
    //#2
  }

  // Fill the rest of the dp table.
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // If the characters match, no operation is needed, cost is the same as dp[i-1][j-1].
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // If characters don't match, consider the minimum cost of three operations:
        // 1. Insertion: dp[i][j-1] + 1 (insert char in s1)
        // 2. Deletion: dp[i-1][j] + 1 (delete char from s1)
        // 3. Substitution: dp[i-1][j-1] + 1 (replace char in s1)
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
      //#3 Completed calculating dp[i][j]
    }
  }

  // The final answer is the edit distance between the entire strings s1 and s2.
  //#4
  return dp[m][n];
}
