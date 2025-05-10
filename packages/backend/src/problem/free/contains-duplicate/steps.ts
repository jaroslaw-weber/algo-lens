
import { ProblemState } from "algo-lens-core"; // Keep ProblemState for return type hint
import { asArray, asHashset } from "../../core/utils"; // Keep utils used by logger internally
import { StepLoggerV2 } from "../../core/StepLoggerV2";

/**
 * Implements the containsDuplicate algorithm which checks if there are any duplicate numbers in an array.
 * @param nums - The input array of numbers.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function generateSteps(nums: number[]): ProblemState[] {
  const logger = new StepLoggerV2();
  let result = false; // Initialize result to false
  const hashSet: Set<number> = new Set();

  // Initial state log before the loop starts
  logger.arrayV2({ nums: nums }, {});
  logger.hashset("hashSet", hashSet, { value: -1, color: "neutral" }); // Initial empty hashset state
  logger.simple({ result }); // Initial result state
  logger.breakpoint_explanation = "Initial state: empty hashSet, result is false.";
  logger.breakpoint(1);

  // Main loop to check for duplicates
  for (let i = 0; i < nums.length; i++) {
    // Log state before checking hashSet
    logger.arrayV2({ nums: nums }, { i: i });
    logger.hashset("hashSet", hashSet, { value: nums[i], color: "neutral" }); // Highlight value being checked
    logger.simple({ result });
    logger.breakpoint_explanation = `Checking if element at index ${i} is in hashSet.`;
    logger.breakpoint(2);

    if (hashSet.has(nums[i])) {
      result = true; // Set result to true if duplicate found
      // Log duplicate found state
      logger.arrayV2({ nums: nums }, { i: i });
      logger.hashset("hashSet", hashSet, { value: nums[i], color: "error" }); // Highlight duplicate
      logger.simple({ result }); // Log final true result
      logger.breakpoint_explanation = "Duplicate found. Set result to true and return.";
      logger.breakpoint(3);
      return logger.getSteps(); // Return early
    } else {
      hashSet.add(nums[i]);
      // Log state after adding to hashSet
      logger.arrayV2({ nums: nums }, { i: i });
      logger.hashset("hashSet", hashSet, { value: nums[i], color: "success" }); // Highlight added value
      logger.simple({ result });
      logger.breakpoint_explanation = "Element not in hashSet. Added element to hashSet.";
      logger.breakpoint(4);
    }
  }

  // Logs the final state when no duplicate is found
  logger.arrayV2({ nums: nums }, {}); // Final array state
  logger.hashset("hashSet", hashSet, { value: -1, color: "neutral" }); // Final hashset state
  logger.simple({ result }); // Log final false result
  logger.breakpoint_explanation = "No duplicates found after checking all elements. Result is false.";
  logger.breakpoint(5);

  return logger.getSteps();
}
