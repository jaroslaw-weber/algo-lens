import { ProblemState, Variable } from "algo-lens-core";
import { ProductExceptSelfInput } from "./types"; // Import from local types.ts
import { asNums, asProductsLeft, asProductsRight, asOutput } from "./variables"; // Import from local variables.ts

/**
 * Implements the product of array except self algorithm which calculates the product of all numbers in the input array except for the number at each index.
 * Generates steps for visualization.
 * @param p - The input parameters including an array of numbers.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function productExceptSelf(p: ProductExceptSelfInput): ProblemState[] {
  const { nums } = p;
  const steps: ProblemState[] = [];
  const length = nums.length;
  const output: number[] = new Array(length).fill(1);
  const productsLeft: number[] = new Array(length).fill(1);
  const productsRight: number[] = new Array(length).fill(1);

  // Helper function to log the state at different points
  function log(point: number, indices: { numsIndex?: number[]; leftIndex?: number[]; rightIndex?: number[]; outputIndex?: number[] } = {}) {
    const variables: Variable[] = [
      asNums(nums, indices.numsIndex),
      asProductsLeft(productsLeft, indices.leftIndex),
      asProductsRight(productsRight, indices.rightIndex),
      asOutput(output, indices.outputIndex),
    ];
    steps.push({ variables, breakpoint: point });
  }

  // Initial state log before the loop starts (#1)
  log(1);

  // Fill productsLeft array (prefix products)
  for (let i = 1; i < length; i++) {
    productsLeft[i] = productsLeft[i - 1] * nums[i - 1];
    log(2, { leftIndex: [i, i - 1], numsIndex: [i - 1] }); // #2
  }

  // Fill productsRight array (suffix products)
  for (let i = length - 2; i >= 0; i--) {
    productsRight[i] = productsRight[i + 1] * nums[i + 1];
    log(3, { rightIndex: [i, i + 1], numsIndex: [i + 1] }); // #3
  }

  // Calculate the output array by combining prefix and suffix products
  for (let i = 0; i < length; i++) {
    output[i] = productsLeft[i] * productsRight[i];
    log(4, { outputIndex: [i], leftIndex: [i], rightIndex: [i] }); // #4
  }

  // Logs the final state with the output array (#5)
  log(5);

  return steps;
}
