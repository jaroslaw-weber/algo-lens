// Determines if a string 's' can be segmented into a space-separated sequence
// of one or more dictionary words from 'wordDict'.
export function wordBreak(s: string, wordDict: string[]): boolean {
  // Create a Set from the dictionary for efficient word lookup (O(1) average time).
  const wordSet = new Set(wordDict);
  //#1 Initialize word set for quick lookup

  // dp[i] will be true if the first i characters of s (s[0...i-1]) can be segmented.
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  // Base case: An empty string can always be segmented.
  dp[0] = true;
  //#2 Initialize DP array and base case

  // Iterate through the string from length 1 up to n.
  for (let i = 1; i <= n; i++) {
    //#3 Start outer loop (checking prefixes s[0...i-1])
    // Check all possible split points j (0 to i-1).
    for (let j = 0; j < i; j++) {
      //#4 Start inner loop (checking split points j)
      // Check two conditions:
      // 1. Can the prefix s[0...j-1] be segmented? (dp[j])
      // 2. Is the suffix s[j...i-1] a word in the dictionary? (wordSet.has(s.substring(j, i)))
      const suffix = s.substring(j, i);
      //#5 Extract suffix s[j...i-1]

      if (dp[j] && wordSet.has(suffix)) {
        // If both conditions are true, then the prefix s[0...i-1] can be segmented.
        dp[i] = true;
        //#6 Found a valid segmentation for s[0...i-1], set dp[i] to true
        // Break the inner loop since we've found a way to segment s[0...i-1].
        break;
        //#7 Break inner loop (optimization)
      }
      //#8 Segmentation using split point j didn't work
    }
    //#9 Finished checking all split points for prefix s[0...i-1]
  }
  //#10 Finished outer loop

  // The final result is dp[n], indicating if the entire string s can be segmented.
  //#11 Return final result dp[n]
  return dp[n];
}
