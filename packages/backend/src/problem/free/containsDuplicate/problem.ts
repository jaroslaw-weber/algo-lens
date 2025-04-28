// Imports specific utility functions and type definitions
import { Problem, ProblemState, ThemeColor } from "algo-lens-core";
import {
  asArray,
  asHashset,
  asBooleanGroup,
} from "../../core/utils"; // Adjusted path
import { ContainsDuplicateInput } from "./types"; // New import
import { code } from "./code"; // New import

/**
 * Implements the containsDuplicate algorithm which checks if there are any duplicate numbers in an array.
 * @param p - The input parameters including an array of numbers.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
function containsDuplicate(p: ContainsDuplicateInput): ProblemState[] { // Renamed export to function
  const { nums } = p;
  const steps: ProblemState[] = [];
  const hashSet: Set<number> = new Set();

  // Helper function to create and log each step's computational state
  function log(point: number, i?: number, existsInSet?: boolean) {
    const color :ThemeColor= existsInSet ? "error" : "success";
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
      log(3, i, true);
      return steps;
    } else {
      hashSet.add(nums[i]);
      log(4, i, false);
    }
  }

  // Logs the final state
  log(5);

  return steps;
}

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Contains Duplicate";
const getInput = () => ({
  nums: [1, 2, 3, 1, 4, 5, 6, 6],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const problem: Problem<
  ContainsDuplicateInput,
  ProblemState
> = {
  title,
  emoji: '👯',
  code, // Use imported code
  getInput,
  func: containsDuplicate, // Use local function
  id: "contains-duplicate", // Keep original ID for now, might need adjustment later
  tags: ["hashset"],
};
