// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState, ThemeColor } from "../core/types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
  asHashset,
  asBooleanGroup,
} from "../core/utils";

// Defines the interface for the input expected by the containsDuplicate function
interface ContainsDuplicateInput {
  nums: number[];
}

/**
 * Implements the containsDuplicate algorithm which checks if there are any duplicate numbers in an array.
 * @param p - The input parameters including an array of numbers.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function containsDuplicate(p: ContainsDuplicateInput): ProblemState[] {
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

// Example implementation of the containsDuplicate function for demonstration and testing
const code = `function containsDuplicate(nums: number[]): boolean {
  //Create a hash set to store unique numbers
  const hashSet = new Set<number>();

  //#1 Iterate through the input array
  for (let i = 0; i < nums.length; i++) {
    //#2 Check if the current number is already in the hash set
    if (hashSet.has(nums[i])) {
      //#3 If the number exists, return true indicating a duplicate
      return true;
    } else {
      //#4 Add the number to the hash set
      hashSet.add(nums[i]);
    }
  }

  //#5 If no duplicates are found, return false
  return false;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Contains Duplicate";
const getInput = () => ({
  nums: [1, 2, 3, 1, 4, 5, 6, 6],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const containsDuplicateProblem: Problem<
  ContainsDuplicateInput,
  ProblemState
> = {
  title,
  code,
  getInput,
  func: containsDuplicate,
  id: "contains-duplicate",
  tags: ["hashset"],
};
