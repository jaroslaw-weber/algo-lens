
// Defines the interface for the input expected by the missingNumber function
interface MissingNumberInput {
  nums: number[];
}

/**
 * Implements the algorithm which finds the missing number in a sequence of consecutive integers starting from 0.
 * @param p - The input parameters including an array of numbers.
 * @returns The missing number in the sequence.
 */
export function missingNumber(p: MissingNumberInput): number {
  const { nums } = p;
  let n = nums.length + 1; //#1 Define the total count of numbers in the sequence
  let expectedSum = (n * (n + 1)) / 2; //#2 Calculate the expected sum of the sequence
  let actualSum = 0;

  for (let i = 0; i < nums.length; i++) {
    actualSum += nums[i]; //#3 Calculate the actual sum of the given numbers
  }

  return expectedSum - actualSum; //#4 Return the missing number by subtracting the actual sum from the expected sum
}

// Example implementation of the missingNumber function for demonstration and testing
const code = `function missingNumber(nums: number[]): number {
  let n = nums.length + 1; //#1
  let expectedSum = (n * (n + 1)) / 2; //#2
  let actualSum = 0;

  for (let i = 0; i < nums.length; i++) {
    actualSum += nums[i]; //#3
  }

  return expectedSum - actualSum; //#4
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Missing Number";
const getInput = () => ({
  nums: [0, 1, 3],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const missingNumberProblem: Problem<MissingNumberInput, number> = {
  title,
  code,
  getInput,
  func: missingNumber,
  id: "missing-number",
};
