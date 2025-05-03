// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState, Variable } from "algo-lens-core";
import { asArray, asSimpleValue, asValueGroup } from "../core/utils";

// Defines the interface for the input expected by the productExceptSelf function
interface ProductExceptSelfInput {
  nums: number[];
}

/**
 * Implements the product of array except self algorithm which calculates the product of all numbers in the input array except for the number at each index.
 * @param p - The input parameters including an array of numbers.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function productExceptSelf(p: ProductExceptSelfInput): ProblemState[] {
  const { nums } = p;
  // Note: The ProblemState[] return type and the old log function are no longer needed here,
  // as step generation is handled separately. This function now directly returns the result array.
  const length = nums.length;
  const output: number[] = new Array(length).fill(1);
  const productsLeft: number[] = new Array(length).fill(1);
  const productsRight: number[] = new Array(length).fill(1);

  //#1 Initialize prefix, suffix, and result arrays. Start prefix calculation loop.
  for (let i = 1; i < length; i++) {
    productsLeft[i] = productsLeft[i - 1] * nums[i - 1];
    //#2 Calculated prefix product for index i. Continue loop or start suffix calculation.
  }

  //#3 Start suffix calculation loop (iterating backwards).
  for (let i = length - 2; i >= 0; i--) {
    productsRight[i] = productsRight[i + 1] * nums[i + 1];
    //#4 Calculated suffix product for index i. Continue loop or start final result calculation.
  }

  //#5 Start final result calculation loop.
  for (let i = 0; i < length; i++) {
    output[i] = productsLeft[i] * productsRight[i];
    //#6 Calculated final result for index i. Continue loop or prepare to return.
  }

  //#7 Final result array 'output' is ready. Return 'output'.
  return output; // Return the actual result array
}

// The code string below should ideally reflect the function above with breakpoints.
// Let's update it to match.
const code = `function productExceptSelf(nums: number[]): number[] {
  const length = nums.length;
  const output = new Array(length).fill(1);
  const productsLeft = new Array(length).fill(1);
  const productsRight = new Array(length).fill(1);

  //#1 Initialize prefix, suffix, and result arrays. Start prefix calculation loop.
  for (let i = 1; i < length; i++) {
    productsLeft[i] = productsLeft[i - 1] * nums[i - 1];
    //#2 Calculated prefix product for index i. Continue loop or start suffix calculation.
  }

  //#3 Start suffix calculation loop (iterating backwards).
  for (let i = length - 2; i >= 0; i--) {
    productsRight[i] = productsRight[i + 1] * nums[i + 1];
    //#4 Calculated suffix product for index i. Continue loop or start final result calculation.
  }

  //#5 Start final result calculation loop.
  for (let i = 0; i < length; i++) {
    output[i] = productsLeft[i] * productsRight[i];
    //#6 Calculated final result for index i. Continue loop or prepare to return.
  }

  //#7 Final result array 'output' is ready. Return 'output'.
  return output;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Product of Array Except Self";
// const getInput = () => ({ // getInput is usually defined in testcase.ts now
//   nums: [1, 2, 3, 4, 5],
// });

// Export the complete problem setup including the input function, the computational function, and other metadata
export const problem: Problem<
  ProductExceptSelfInput // ProblemState is typically handled by generateSteps now
> = {
  title,
  emoji: '✖️',
  code, // This code string now matches the function above
  // func: productExceptSelf, // func is usually removed when generateSteps is primary
  id: "product-of-array-except-self",
  tags: ["array", "prefix sum"],
};
