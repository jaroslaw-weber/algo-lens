function missingNumber(nums: number[]): number {
  let n = nums.length;
  // Calculate the expected sum of numbers from 0 to n (inclusive)
  let expectedSum = (n * (n + 1)) / 2;

  let actualSum = 0;
  //#1: Iterate through the given array of numbers
  for (let i = 0; i < nums.length; i++) {
    actualSum += nums[i];
    //#2: Add the current number to the actualSum
  }

  // Calculate the missing number by subtracting the actualSum from the expectedSum
  const result = expectedSum - actualSum;
  //#3: The result will be the missing number

  return result;
}
