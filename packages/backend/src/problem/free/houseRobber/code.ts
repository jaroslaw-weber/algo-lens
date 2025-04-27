export const code = `function rob(nums) {
  const n = nums.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 0; 
  //#1
  dp[1] = nums[0]; 
  //#2
  for (let i = 2; i <= n; i++) {
    const skipCurrent = dp[i - 1];
    const currentHouse = nums[i - 1];
    const twoHousesBefore = dp[i - 2];
    const includeCurrent = twoHousesBefore + currentHouse;
    dp[i] = Math.max(skipCurrent, includeCurrent);  
    //#3
  }
  const result = dp[n]; 
  //#4
  return result;
}`;
