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
  logger.arrayV2({ nums: nums }, {});
  logger.arrayV2({ productsLeft: productsLeft }, {});
  logger.arrayV2({ productsRight: productsRight }, {});
  logger.arrayV2({ output: output }, {});
  logger.comment = "Initialize the output array and two temporary arrays, productsLeft and productsRight, all filled with 1s. productsLeft will store the product of all elements to the left of the current index, and productsRight will store the product of all elements to the right.";
  logger.breakpoint(1);

  // Fill productsLeft array (prefix products)
  for (let i = 1; i < length; i++) {
    const prevProductsLeft = productsLeft[i - 1];
    const prevNum = nums[i - 1];
    productsLeft[i] = prevProductsLeft * prevNum;
    logger.arrayV2({ nums: nums }, { "i - 1": i - 1 }); // Use inferred label "i - 1"
    logger.arrayV2({ productsLeft: productsLeft }, { i: i, "i - 1": i - 1 }); // Use inferred labels "i" and "i - 1"
    logger.arrayV2({ productsRight: productsRight }, {});
    logger.arrayV2({ output: output }, {});
    logger.comment = `Calculate the prefix product for index ${i}. productsLeft[${i}] is the product of all elements to the left of index ${i}. This is calculated by multiplying the prefix product at the previous index (${i - 1}), which is productsLeft[${ i - 1 }] (${prevProductsLeft}), by the number at the previous index nums[${i - 1}] (${prevNum}). The result is ${ productsLeft[i] }.`;
    logger.breakpoint(2);
  }

  // Fill productsRight array (suffix products)
  for (let i = length - 2; i >= 0; i--) {
    const nextProductsRight = productsRight[i + 1];
    const nextNum = nums[i + 1];
    productsRight[i] = nextProductsRight * nextNum;
    logger.arrayV2({ nums: nums }, { "i + 1": i + 1 }); // Use inferred label "i + 1"
    logger.arrayV2({ productsLeft: productsLeft }, {});
    logger.arrayV2({ productsRight: productsRight }, { i: i, "i + 1": i + 1 }); // Use inferred labels "i" and "i + 1"
    logger.arrayV2({ output: output }, {});
    logger.comment = `Calculate the suffix product for index ${i}. productsRight[${i}] is the product of all elements to the right of index ${i}. This is calculated by multiplying the suffix product at the next index (${i + 1}), which is productsRight[${ i + 1 }] (${nextProductsRight}), by the number at the next index nums[${i + 1}] (${nextNum}). The result is ${ productsRight[i] }.`;
    logger.breakpoint(3);
  }

  // Calculate the output array by combining prefix and suffix products
  for (let i = 0; i < length; i++) {
    const currentProductsLeft = productsLeft[i];
    const currentProductsRight = productsRight[i];
    output[i] = currentProductsLeft * currentProductsRight;
    logger.arrayV2({ nums: nums }, {});
    logger.arrayV2({ productsLeft: productsLeft }, { i: i });
    logger.arrayV2({ productsRight: productsRight }, { i: i });
    logger.arrayV2({ output: output }, { i: i });
    logger.comment = `Calculate the final output for index ${i}. The product of all elements except self at index ${i} is the product of the prefix product to its left (productsLeft[${i}] = ${currentProductsLeft}) and the suffix product to its right (productsRight[${i}] = ${currentProductsRight}). The result is output[${i}] = ${output[i]}.`;
    logger.breakpoint(4);
  }

  // Log the final state with the result
  logger.arrayV2({ result: output }, {});
  logger.hide("nums");
  logger.hide("productsLeft");
  logger.hide("productsRight");
  logger.hide("output");
  logger.comment = "All elements have been processed. The output array now contains the product of all elements except self for each index of the original input array.";
  logger.breakpoint(5);

  return logger.getSteps();
}
