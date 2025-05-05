// Finds the length of the longest strictly increasing subsequence within a given array of numbers.
export function longestIncreasingSubsequence(nums: number[]) {
  // dp[i] will store the length of the longest increasing subsequence ending at index i.
  // Initialize all lengths to 1, as each element itself is an increasing subsequence of length 1.
  const dp = new Array(nums.length).fill(1);
  //#1 Initialize DP array

  // Iterate through the array starting from the second element.
  for (let i = 1; i < nums.length; i++) {
    // Compare the current element nums[i] with all previous elements nums[j].
    for (let j = 0; j < i; j++) {
      //#2 Inner loop to check previous elements
      // If the current element is greater than a previous element, it can potentially extend the LIS ending at j.
      if (nums[i] > nums[j]) {
        // Update dp[i] if the LIS ending at j plus the current element is longer than the current LIS ending at i.
        dp[i] = Math.max(dp[i], dp[j] + 1);
        //#3 Update dp[i] if a longer subsequence is found
      }
    }
  }
  // The length of the longest increasing subsequence is the maximum value in the dp array.
  const result = Math.max(...dp);
  //#4 Find the maximum value in dp array
  return result;
}
