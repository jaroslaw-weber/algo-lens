import { Problem, ProblemState, Variable } from "../types";
import { asArray, asSimpleValue, asValueGroup } from "../utils";

// Defines the interface for the input expected by the missingNumber function
interface MissingNumberInput {
  nums: number[];
}
/**
 * Implements the algorithm which finds the missing number in a sequence of consecutive integers starting from 0.
 */
export function missingNumber(p: MissingNumberInput): ProblemState[] {
  const { nums } = p;
  const states: ProblemState[] = [];

  let n = nums.length + 1;
  // Calculate the expected sum of the sequence using the formula for the sum of an arithmetic series
  let expectedSum = (n * (n + 1)) / 2;

  let actualSum = 0;

  //#1 Define the total count of numbers in the sequence
  function log(point: number, i?: number, result?: number) {
    const v: Variable[] = [];
    states.push({
      variables: v,
      breakpoint: point,
    });
    const group: any = { expectedSum, actualSum };
    if (result !== undefined) {
      group.result = result;
    }
    v.push(asValueGroup("sum", group, { min: 0, max: 2 * n }));
    if (i !== undefined) {
      v.push(asValueGroup("loop", { i }, { min: 0, max: nums.length - 1 }));
    }
  }
  log(1); // Log the state at point 1

  for (let i = 0; i < nums.length; i++) {
    actualSum += nums[i]; //Calculate the actual sum of the given numbers
    log(2, i); // Log the state at point 2
  }

  const result = expectedSum - actualSum; //Return the missing number by subtracting the actual sum from the expected sum
  log(3, undefined, result); // Log the state at point 3 with the result

  return states;
}

// Example implementation of the missingNumber function for demonstration and testing
const code = `function missingNumber(nums: number[]): number {
  let n = nums.length + 1; 
  // Calculate the expected sum of numbers from 1 to n (inclusive)
  let expectedSum = (n * (n + 1)) / 2; 

  let actualSum = 0;
  //#1 Iterate through the given array of numbers
  for (let i = 0; i < nums.length; i++) {
    actualSum += nums[i];
    //#2: Add the current number to the actualSum
  }

  // Calculate the missing number by subtracting the actualSum from the expectedSum
  const result = expectedSum - actualSum; 
  //#3: The result will be the missing number

  return result;
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
