
// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../utils";

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
  const steps: ProblemState[] = [];

  // Helper function to create and log each step's computational state
  function logStep(point: number, product?: number, result?: number[]) {
    const step: ProblemState = {
      variables: [asArray("nums", nums)],
      breakpoint: point,
    };
    if (product !== undefined) {
      step.variables.push(
        asValueGroup("product", { product }, { min: 0, max: nums.reduce((a, b) => a * b, 1) })
      );
    }
    if (result) {
      step.variables.push(...asSimpleValue({ result: JSON.stringify(result) }));
    }
    steps.push(step);
  }

  // Initial state log before the loop starts
  logStep(1);

  // Calculate the total product
  let totalProduct = nums.reduce((a, b) => a * b, 1);
  logStep(2, totalProduct);

  // Create the output array
  const output: number[] = new Array(nums.length);

  // Main loop to calculate the product except self
  for (let i = 0; i < nums.length; i++) {
    output[i] = totalProduct / nums[i];
    logStep(3, totalProduct, nums[i], [output[i]]);
  }

  // Logs the final state with the output array
  logStep(4, undefined, output);

  return steps;
}

// Example implementation of the productExceptSelf function for demonstration and testing
const code = `function productExceptSelf(nums: number[]): number[] {
  // Calculate the total product of the input array
  let totalProduct = 1;
  for (let num of nums) {
    totalProduct *= num;
  }

  //#1 Initialize the output array
  const output = new Array(nums.length);

  //#2 Calculate the product except self for each number in the array
  for (let i = 0; i < nums.length; i++) {
    output[i] = totalProduct / nums[i];
  }

  //#3 Return the output array
  return output;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Product of Array Except Self";
const getInput = () => ({
  nums: [1, 2, 3, 4, 5],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const productExceptSelfProblem: Problem<ProductExceptSelfInput, ProblemState> = {
  title,
  code,
  getInput,
  func: productExceptSelf,
  id: "product-of-array-except-self",
};
