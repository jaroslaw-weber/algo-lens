export const code = `function wordBreak(s, wordDict) {
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true; 
  //#1
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      const word = s.substring(j, i)
      //#2
      if (dp[j] && wordDict.includes(word)) {
        dp[i] = true; 
        //#3
        break;
      }
    }
  }
  const result = dp[n]; 
  //#4
  return result;
}`;
