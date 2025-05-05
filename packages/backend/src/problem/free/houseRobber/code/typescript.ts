// Function to calculate the maximum amount of money that can be robbed from houses without alerting the police
// (cannot rob adjacent houses).
export function rob(nums: number[]) {
  const n = nums.length;
  // dp[i] will store the maximum amount that can be robbed up to house i (exclusive index, so i=1 means first house).
  const dp = new Array(n + 1).fill(0);
  // Base case: No houses, no money.
  dp[0] = 0;
  //#1
  // Base case: Only one house, rob it. dp[1] corresponds to nums[0].
  dp[1] = nums[0];
  //#2
  // Iterate from the second house onwards (index 2 in dp corresponds to index 1 in nums).
  for (let i = 2; i <= n; i++) {
    // Option 1: Skip the current house (nums[i-1]). Max money is the same as robbing up to the previous house (dp[i-1]).
    const skipCurrent = dp[i - 1];
    // Get the money in the current house (nums[i-1]).
    const currentHouse = nums[i - 1];
    // Option 2: Rob the current house. Max money is current house + money from robbing up to two houses before (dp[i-2]).
    const twoHousesBefore = dp[i - 2];
    const includeCurrent = twoHousesBefore + currentHouse;
    // Choose the maximum of the two options.
    dp[i] = Math.max(skipCurrent, includeCurrent);
    //#3 Completed calculating dp[i]
  }
  // The final result is the maximum amount that can be robbed considering all houses (up to dp[n]).
  const result = dp[n];
  //#4
  return result;
}
