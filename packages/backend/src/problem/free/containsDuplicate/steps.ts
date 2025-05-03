import { ProblemState, ThemeColor } from "algo-lens-core";
import { asArray, asHashset, asBooleanGroup } from "../../core/utils";
import { ContainsDuplicateInput } from "./types";

/**
 * Implements the containsDuplicate algorithm which checks if there are any duplicate numbers in an array.
 * @param p - The input parameters including an array of numbers.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function generateSteps(nums: number[]): ProblemState[] {
  // Renamed export to function
  const steps: ProblemState[] = [];
  let result = false; // Initialize result to false
  const hashSet: Set<number> = new Set();

  // Helper function to create and log each step's computational state
  function log(point: number, i?: number, existsInSet?: boolean) {
    const color: ThemeColor = existsInSet ? "error" : "success";
    const step: ProblemState = {
      variables: [
        asArray("nums", nums, i),
        asHashset("hashSet", hashSet, { value: nums[i], color }),
        asBooleanGroup("exist check", { existsInSet }),
      ],
      breakpoint: point,
    };
    steps.push(step);
  }

  // Initial state log before the loop starts
  log(1);

  // Main loop to check for duplicates
  for (let i = 0; i < nums.length; i++) {
    log(2, i);
    if (hashSet.has(nums[i])) {
      result = true; // Set result to true if duplicate found
      log(3, i, true);
      // Add final step logging result before returning
      steps.push({
        variables: [
          asArray("nums", nums, i),
          asHashset("hashSet", hashSet, { value: nums[i], color: "error" }),
          asBooleanGroup("exist check", { existsInSet: true }),
          asBooleanGroup("result", { result }), // Log final result
        ],
        breakpoint: 5, // Use a distinct breakpoint for the final result log
      });
      return steps;
    } else {
      hashSet.add(nums[i]);
      log(4, i, false);
    }
  }

  // Logs the final state before returning when no duplicate is found
  log(5); // Log the state after the loop completes

  // Add final step logging result before returning
  steps.push({
    variables: [
      asArray("nums", nums), // No specific index highlighted here
      asHashset("hashSet", hashSet), // Show final hashSet state
      // Optionally include exist check if needed, or omit if loop finished without finding duplicate
      asBooleanGroup("result", { result }), // Log final result
    ],
    breakpoint: 5, // Use the same final breakpoint
  });

  return steps;
}
