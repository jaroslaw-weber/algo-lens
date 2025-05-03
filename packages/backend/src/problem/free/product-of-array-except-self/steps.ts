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
  const logger = new StepLoggerV2();
  const length = nums.length;
  const output: number[] = new Array(length).fill(1);
  // Create the left (prefix) and right (suffix) products arrays
  const productsLeft: number[] = new Array(length).fill(1);
  const productsRight: number[] = new Array(length).fill(1);

  // Log the initial state
  logger.array("nums", nums);
  logger.array("productsLeft", productsLeft);
  logger.array("productsRight", productsRight);
  logger.array("output", output);
  logger.breakpoint(1);

  // Fill productsLeft array (prefix products)
  for (let i = 1; i < length; i++) {
    productsLeft[i] = productsLeft[i - 1] * nums[i - 1];
    logger.array("nums", nums, { pointer: [i - 1] });
    logger.array("productsLeft", productsLeft, { pointer: [i, i - 1] });
    logger.array("productsRight", productsRight);
    logger.array("output", output);
    logger.breakpoint(2);
  }

  // Fill productsRight array (suffix products)
  for (let i = length - 2; i >= 0; i--) {
    productsRight[i] = productsRight[i + 1] * nums[i + 1];
    logger.array("nums", nums, ...[i + 1]);
    logger.array("productsLeft", productsLeft);
    logger.array("productsRight", productsRight, ...[i, i + 1]);
    logger.array("output", output);
    logger.breakpoint(3);
  }

  // Calculate the output array by combining prefix and suffix products
  for (let i = 0; i < length; i++) {
    output[i] = productsLeft[i] * productsRight[i];
    logger.array("nums", nums);
    logger.array("productsLeft", productsLeft, i);
    logger.array("productsRight", productsRight, i);
    logger.array("output", output, i);
    logger.breakpoint(4);
  }

  // Log the final state with the result
  logger.array("result", output);
  logger.hide("nums");
  logger.hide("productsLeft");
  logger.hide("productsRight");
  logger.hide("output");
  logger.breakpoint(5);

  return logger.getSteps();
}
