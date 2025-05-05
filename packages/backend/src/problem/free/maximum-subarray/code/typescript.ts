export function maxSubArray(nums: number[]): number {
  // Initialize maxEndingHere and maxSoFar with the first element
  let maxEndingHere = nums[0];
  let maxSoFar = nums[0];

  //#1 Start the loop from the second element
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    //#2 Decide whether to extend the current subarray or start a new one
    maxEndingHere = Math.max(num, maxEndingHere + num);
    //#3 Updated maxEndingHere

    //#4 Update maxSoFar if maxEndingHere is greater
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
    //#5 Updated maxSoFar
  }

  //#6 Return the maximum subarray sum found
  return maxSoFar;
}
