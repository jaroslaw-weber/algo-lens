export const code = `function climbStairs(n) {
  // Initialize a dynamic programming array with n + 1 elements to hold the number of ways to reach each step
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 1; // Base case: one way to stand on the ground (step 0)
  dp[1] = 1; // Base case: one way to reach the first step directly

  //#1 Loop through steps starting from the second step to compute number of ways to reach each step
  for (let i = 2; i <= n; i++) {
    // The number of ways to reach step i is the sum of the ways to reach step (i-1) and step (i-2)
    dp[i] = dp[i - 1] + dp[i - 2];

    //#2 End of loop iteration, continue to next step
  }

  // Store the result, which is the total number of ways to reach the nth step
  const result = dp[n];

  //#3 Return the total ways to reach the nth step
  return result;
}`;
