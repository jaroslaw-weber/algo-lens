import { ProblemState } from "algo-lens-core"; // Keep ProblemState for return type hint
import { asArray, asHashset } from "../../core/utils"; // Keep utils used by logger internally
import { StepLoggerV2 } from "../../core/StepLoggerV2";

/**
 * Implements the containsDuplicate algorithm which checks if there are any duplicate numbers in an array.
 * @param nums - The input array of numbers.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function generateSteps(nums: number[]): ProblemState[] {
  const l = new StepLoggerV2(); // Changed logger to l
  let result = false; // Initialize result to false
  const hashSet: Set<number> = new Set();

  // Initial state log before the loop starts
  l.arrayV2("nums", nums); // Changed logger.array to l.arrayV2
  l.hashset("hashSet", hashSet, {}); // Changed logger to l
  l.simple({ result }); // Changed logger to l // Initial result state
  l.breakpoint(1); // Changed logger to l

  // Main loop to check for duplicates
  for (let i = 0; i < nums.length; i++) {
    // Log state before checking hashSet
    l.arrayV2("nums", nums, i); // Changed logger.array to l.arrayV2
    l.hashset("hashSet", hashSet, { value: nums[i], color: "neutral" }); // Changed logger to l // Highlight value being checked
    l.simple({ result }); // Changed logger to l
    l.breakpoint(2); // Changed logger to l

    if (hashSet.has(nums[i])) {
      result = true; // Set result to true if duplicate found
      // Log duplicate found state
      l.arrayV2("nums", nums, i); // Changed logger.array to l.arrayV2
      l.hashset("hashSet", hashSet, { value: nums[i], color: "error" }); // Changed logger to l // Highlight duplicate
      l.simple({ result }); // Changed logger to l // Log final true result
      l.breakpoint(3); // Changed logger to l
      return l.getSteps(); // Changed logger to l // Return early
    } else {
      hashSet.add(nums[i]);
      // Log state after adding to hashSet
      l.arrayV2("nums", nums, i); // Changed logger.array to l.arrayV2
      l.hashset("hashSet", hashSet, { value: nums[i], color: "success" }); // Changed logger to l // Highlight added value
      l.simple({ result }); // Changed logger to l
      l.breakpoint(4); // Changed logger to l
    }
  }

  // Logs the final state when no duplicate is found
  l.arrayV2("nums", nums); // Changed logger.array to l.arrayV2 // Final array state
  l.hashset("hashSet", hashSet, {}); // Changed logger to l // Final hashset state
  l.simple({ result }); // Changed logger to l // Log final false result
  l.breakpoint(5); // Changed logger to l

  return l.getSteps(); // Changed logger to l
}
