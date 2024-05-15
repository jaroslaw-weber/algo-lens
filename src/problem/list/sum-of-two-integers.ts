import { Problem, ProblemState } from "../types";

// Defines the interface for the input expected by the sumOfTwoIntegers function
interface SumOfTwoIntegersInput {
  a: number;
  b: number;
}

/**
 * Implements the sum of two integers algorithm.
 * @param p - The input parameters including two integers.
 * @returns The sum of the two integers.
 */
export function sumOfTwoIntegers(p: SumOfTwoIntegersInput): ProblemState[] {
  const s : ProblemState[]= []
  const { a, b } = p; //#1 Extract input parameters
  let result: number; //#2 Initialize result variable

  // Calculate the sum of the two integers
  result = a + b; //#3 Calculate the sum

  return s //#4 Return the result
}

// Example implementation of the sumOfTwoIntegers function for demonstration and testing
const code = `function sumOfTwoIntegers(a: number, b: number): number {
  //#1 Initialize the result variable
  let result: number;

  //#2 Calculate the sum of the two integers
  result = a + b;

  //#3 Return the result
  return result;
}`;

// Export the complete problem setup including the input function, the computational function, and other metadata
export const sumOfTwoIntegersProblem: Problem<SumOfTwoIntegersInput, number> = {
  title: "Sum of Two Integers",
  code,
  getInput: () => ({ a: 3, b: 5 }),
  func: sumOfTwoIntegers,
  id: "sum-of-two-integers",
};
