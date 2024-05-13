
// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState } from "../types";
import {
  asArray,
  asValueGroup,
} from "../utils";

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

  // Helper function to create and log each step's computational state
  function logStep(point: number, leftIndex?: number, rightIndex?: number) {
    const step: ProblemState = {
      variables: [asArray("nums", nums, left, right)],
    };
    if (leftIndex !== undefined && rightIndex !== undefined) {
      step.variables.push(
        asValueGroup("bounds", { left: leftIndex, right: rightIndex })
      );
    }
    steps.push(step);
  }

  // Initial state log before the loop starts
  logStep(1);

  // Main loop to find the target number in the rotated array
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    logStep(2, left, right);

    if (nums[mid] === target) {
      logStep(3, left, right);
      break;
    }

    if (nums[left] <= nums[mid]) {
      //#1 Check if the left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        //#2 If the target is in the left half, move the right pointer
        right = mid - 1;
        logStep(4, left, right);
      } else {
        //#3 If the target is not in the left half, move the left pointer
        left = mid + 1;
        logStep(5, left, right);
      }
    } else {
      //#4 Check if the right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        //#5 If the target is in the right half, move the left pointer
        left = mid + 1;
        logStep(6, left, right);
      } else {
        //#6 If the target is not in the right half, move the right pointer
        right = mid - 1;
        logStep(7, left, right);
      }
    }
  }

  // Logs the final state if the target is not found
  if (left > right) {
    logStep(8);
  }

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
  nums: [4, 5, 6, 7, 0, 1, 2],
  target: 0,
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const searchProblem: Problem<SearchInput, ProblemState> = {
  title,
  code,
  getInput,
  func: search,
  id: "search-in-rotated-sorted-array",
};
