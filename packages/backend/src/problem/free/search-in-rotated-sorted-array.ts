// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState, Variable } from "algo-lens-core";
import { asArray, asSimpleValue, asValueGroup } from "../core/utils";

// Defines the interface for the input expected by the search function
interface SearchInput {
  nums: number[];
  target: number;
}

/**
 * Implements the search algorithm which finds a target number in a rotated sorted array.
 * @param p - The input parameters including an array of numbers and a target number.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function search(p: SearchInput): ProblemState[] {
  const { nums, target } = p;
  const steps: ProblemState[] = [];
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  // Helper function to create and log each step's computational state
  function log(point: number, mid?: number) {
    const v: Variable[] = [];
    const step: ProblemState = {
      breakpoint: point,
      variables: v,
    };
    v.push(asArray("nums", nums, left, right, mid));
    v.push(...asSimpleValue({ target, result }));

    steps.push(step);
  }

  // Initial state log before the loop starts
  log(1);

  // Main loop to find the target number in the rotated array
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    log(2, mid);

    if (nums[mid] === target) {
      result = mid;
      log(3, mid);
      return steps;
    }

    if (nums[left] <= nums[mid]) {
      log(4, mid);
      //Check if the left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        //#2 If the target is in the left half, move the right pointer
        right = mid - 1;
        log(5);
      } else {
        //#3 If the target is not in the left half, move the left pointer
        left = mid + 1;
        log(6);
      }
    } else {
      log(7);
      //#4 Check if the right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        //#5 If the target is in the right half, move the left pointer
        left = mid + 1;
        log(8);
      } else {
        //#6 If the target is not in the right half, move the right pointer
        right = mid - 1;
        log(9);
      }
    }
  }

  // Logs the final state if the target is not found
  if (left > right) {
    result = -1;
  } else {
    result = left;
  }
  log(10);

  return steps;
}

// Example implementation of the search function for demonstration and testing
const code = `function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  //#1 Start the loop to find the target number in the rotated array
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    //#2 Check if the middle element is the target
    if (nums[mid] === target) {
      //#3 If the middle element is the target, return its index
      return mid;
    }

    //#4 Check if the left half is sorted
    if (nums[left] <= nums[mid]) {
      //#5 If the target is in the left half, move the right pointer
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        //#6 If the target is not in the left half, move the left pointer
        left = mid + 1;
      }
    } else {
      //#7 Check if the right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        //#8 If the target is in the right half, move the left pointer
        left = mid + 1;
      } else {
        //#9 If the target is not in the right half, move the right pointer
        right = mid - 1;
      }
    }
  }

  //#10 If the target is not found, return -1
  return -1;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Search in Rotated Sorted Array";
const getInput = () => ({
  nums: [13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  target: 1,
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const problem: Problem<SearchInput, ProblemState> = {
  title,
  emoji: '🔍',
  code,
  func: search,
  id: "search-in-rotated-sorted-array",
  tags: ["array", "binary-search"],
};
