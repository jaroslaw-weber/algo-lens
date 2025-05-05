export function longestIncreasingSubsequence(nums: number[]) {
  const dp = new Array(nums.length).fill(1);
  //#1
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      //#2
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        //#3
      }
    }
  }
  const result = Math.max(...dp);
  //#4
  return result;
}
