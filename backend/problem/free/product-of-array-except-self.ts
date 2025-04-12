// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState, Variable } from "../core/types";
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
  const steps: ProblemState[] = [];
  const length = nums.length;
  const output: number[] = new Array(length).fill(1);
  // Create the left (prefix) and right (suffix) products arrays
  const productsLeft: number[] = new Array(length).fill(1);
  const productsRight: number[] = new Array(length).fill(1);

  // Helper function to create and log each step's computational state
  function log(p: {
    point: number;
    numsIndex?: number[];
    leftIndex?: number[];
    rightIndex?: number[];
    outputIndex?: number[];
  }) {
    const v: Variable[] = [];
    const { point, numsIndex, leftIndex, rightIndex, outputIndex } = p;
    const step: ProblemState = {
      variables: v,
      breakpoint: point,
    };
    v.push(asArray("nums", nums, ... (numsIndex??[])))
    if (productsLeft) {
      v.push(asArray("productsLeft", productsLeft, ...(leftIndex??[])))
    }
    if (productsRight) {
      v.push(asArray("productsRight", productsRight, ...(rightIndex??[])))
    }
    if (output) {
      v.push(asArray("output", output, ...(outputIndex??[])));
    }
    steps.push(step);
  }

  // Initial state log before the loop starts
  log({ point: 1 });

  // Fill productsLeft array (prefix products)
  for (let i = 1; i < length; i++) {
    productsLeft[i] = productsLeft[i - 1] * nums[i - 1];
    log({ point: 2, leftIndex: [i, i - 1], numsIndex: [i - 1] });
  }

  // Fill productsRight array (suffix products)
  for (let i = length - 2; i >= 0; i--) {
    productsRight[i] = productsRight[i + 1] * nums[i + 1];
    log({ point: 3, rightIndex: [i, i + 1], numsIndex: [i + 1] });
  }

  // Calculate the output array by combining prefix and suffix products
  for (let i = 0; i < length; i++) {
    output[i] = productsLeft[i] * productsRight[i];
    log({ point: 4, outputIndex: [i], leftIndex: [i], rightIndex: [i] });
  }

  // Logs the final state with the output array
  log({ point: 5 });

  return steps;
}

// Example implementation of the productExceptSelf function for demonstration and testing
const code = `function productExceptSelf(nums: number[]): number[] {
  const length = nums.length;
  const output = new Array(length).fill(1);
  const productsLeft = new Array(length).fill(1);
  const productsRight = new Array(length).fill(1);

  //#1
  for (let i = 1; i < length; i++) {
    productsLeft[i] = productsLeft[i - 1] * nums[i - 1];
    //#2
  }

  for (let i = length - 2; i >= 0; i--) {
    productsRight[i] = productsRight[i + 1] * nums[i + 1];
    //#3
  }

  for (let i = 0; i < length; i++) {
    output[i] = productsLeft[i] * productsRight[i];
    //#4
  }

  //#5
  return output;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Product of Array Except Self";
const getInput = () => ({
  nums: [1, 2, 3, 4, 5],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const productExceptSelfProblem: Problem<
  ProductExceptSelfInput,
  ProblemState
> = {
  title,
  code,
  getInput,
  func: productExceptSelf,
  id: "product-of-array-except-self",
  tags: ["array", "prefix sum"],
  tested:true
};
