
// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../utils";

// Defines the interface for the input expected by the countBits function
interface CountBitsInput {
  n: number;
}

/**
 * Implements the counting bits algorithm which counts the number of 1 bits in each integer from 0 to n.
 * @param p - The input parameter including a number n.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function countBits(p: CountBitsInput): ProblemState[] {
  const { n } = p;
  const steps: ProblemState[] = [];
  let result: number[] = new Array(n + 1).fill(0);

  // Helper function to create and log each step's computational state
  function logStep(point: number, value?: number) {
    const step: ProblemState = {
      variables: [asStringArray("result", result.slice(0, point + 1))],
      breakpoint: point,
    };
    if (value !== undefined) {
      step.variables.push(asValueGroup("value", value));
    }
    steps.push(step);
  }

  // Initial state log before the loop starts
  logStep(0);

  //#1 Start the loop to count the number of 1 bits in each integer from 0 to n
  for (let i = 0; i <= n; i++) {
    //#2 Calculate the number of 1 bits in the current integer
    let count = countOnes(i);
    logStep(2, count);

    //#3 Store the count in the result array
    result[i] = count;
  }

  return steps;
}

// Helper function to count the number of 1 bits in a number
function countOnes(num: number): number {
  let count = 0;
  while (num > 0) {
    //#4 Use a bitwise AND operation to check the least significant bit
    if (num & 1) {
      //#5 If the least significant bit is 1, increment the count
      count++;
    }
    //#6 Shift the number to the right to move to the next bit
    num >>= 1;
  }
  return count;
}

// Example implementation of the countBits function for demonstration and testing
const code = `function countBits(n: number): number[] {
  const result = new Array(n + 1).fill(0);

  //#1 Start the loop to count the number of 1 bits in each integer from 0 to n
  for (let i = 0; i <= n; i++) {
    //#2 Calculate the number of 1 bits in the current integer
    let count = 0;
    let num = i;
    while (num > 0) {
      //#4 Use a bitwise AND operation to check the least significant bit
      if (num & 1) {
        //#5 If the least significant bit is 1, increment the count
        count++;
      }
      //#6 Shift the number to the right to move to the next bit
      num >>= 1;
    }
    //#3 Store the count in the result array
    result[i] = count;
  }
  return result;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Counting Bits";
const getInput = () => ({
  n: 15,
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const countBitsProblem: Problem<CountBitsInput, ProblemState> = {
  title,
  code,
  getInput,
  func: countBits,
  id: "counting-bits",
};
