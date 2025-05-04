// Imports specific utility functions and type definitions from the relative paths
import { ProblemState } from "algo-lens-core"; // Import ProblemState
import { ProductExceptSelfInput } from "./types"; // Import the interface
import { StepLoggerV2 } from "../../core/StepLoggerV2";

/**
 * Implements the product of array except self algorithm which calculates the product of all numbers in the input array except for the number at each index, generating steps for visualization.
 * @param nums - The input array of numbers.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function generateSteps(nums: number[]): ProblemState[] {
  const l = new StepLoggerV2(); // Changed logger to l
  const length = nums.length;
  const output: number[] = new Array(length).fill(1);
  // Create the left (prefix) and right (suffix) products arrays
  const productsLeft: number[] = new Array(length).fill(1);
  const productsRight: number[] = new Array(length).fill(1);

  // Log the initial state
  l.arrayV2("nums", nums); // Changed logger.array to l.arrayV2
  l.arrayV2("productsLeft", productsLeft); // Changed logger.array to l.arrayV2
  l.arrayV2("productsRight", productsRight); // Changed logger.array to l.arrayV2
  l.arrayV2("output", output); // Changed logger.array to l.arrayV2
  l.breakpoint(1); // Changed logger to l

  // Fill productsLeft array (prefix products)
  for (let i = 1; i < length; i++) {
    productsLeft[i] = productsLeft[i - 1] * nums[i - 1];
    l.arrayV2("nums", nums, { pointer: [i - 1] }); // Changed logger.array to l.arrayV2
    l.arrayV2("productsLeft", productsLeft, { pointer: [i, i - 1] }); // Changed logger.array to l.arrayV2
    l.arrayV2("productsRight", productsRight); // Changed logger.array to l.arrayV2
    l.arrayV2("output", output); // Changed logger.array to l.arrayV2
    l.breakpoint(2); // Changed logger to l
  }

  // Fill productsRight array (suffix products)
  for (let i = length - 2; i >= 0; i--) {
    productsRight[i] = productsRight[i + 1] * nums[i + 1];
    l.arrayV2("nums", nums, ...[i + 1]); // Changed logger.array to l.arrayV2
    l.arrayV2("productsLeft", productsLeft); // Changed logger.array to l.arrayV2
    l.arrayV2("productsRight", productsRight, ...[i, i + 1]); // Changed logger.array to l.arrayV2
    l.arrayV2("output", output); // Changed logger.array to l.arrayV2
    l.breakpoint(3); // Changed logger to l
  }

  // Calculate the output array by combining prefix and suffix products
  for (let i = 0; i < length; i++) {
    output[i] = productsLeft[i] * productsRight[i];
    l.arrayV2("nums", nums); // Changed logger.array to l.arrayV2
    l.arrayV2("productsLeft", productsLeft, i); // Changed logger.array to l.arrayV2
    l.arrayV2("productsRight", productsRight, i); // Changed logger.array to l.arrayV2
    l.arrayV2("output", output, i); // Changed logger.array to l.arrayV2
    l.breakpoint(4); // Changed logger to l
  }

  // Log the final state with the result
  l.arrayV2("result", output); // Changed logger.array to l.arrayV2
  l.hide("nums"); // Changed logger to l
  l.hide("productsLeft"); // Changed logger to l
  l.hide("productsRight"); // Changed logger to l
  l.hide("output"); // Changed logger to l
  l.breakpoint(5); // Changed logger to l

  return l.getSteps(); // Changed logger to l
}
