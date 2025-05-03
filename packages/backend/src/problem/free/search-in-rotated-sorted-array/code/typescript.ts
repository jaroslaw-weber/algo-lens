// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState, Variable } from "algo-lens-core";
import { asArray, asSimpleValue, asValueGroup } from "../core/utils"; // Keep for reference

// Defines the interface for the input expected by the search function (will be in types.ts)
interface SearchInput {
  nums: number[];
  target: number;
}

// Core algorithm - with breakpoints added
export function searchAlgorithm(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  //#1 Initialize pointers. Start binary search loop.
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    //#2 Calculated middle index.

    //#3 Check if middle element is the target.
    if (nums[mid] === target) {
      //#4 Target found at mid. Return index.
      return mid; // Target found
    }

    //#5 Determine which half is normally sorted. Check if left half (nums[left] to nums[mid]) is sorted.
    if (nums[left] <= nums[mid]) { // Left half is sorted
      //#6 Left half is sorted. Check if target is within this sorted range.
      if (nums[left] <= target && target < nums[mid]) {
        //#7 Target is in the sorted left half. Adjust right pointer.
        right = mid - 1;
      } else {
        //#8 Target is not in the sorted left half. Adjust left pointer.
        left = mid + 1;
      }
    } else { // Right half must be sorted
      //#9 Right half is sorted. Check if target is within this sorted range.
      if (nums[mid] < target && target <= nums[right]) {
        //#10 Target is in the sorted right half. Adjust left pointer.
        left = mid + 1;
      } else {
        //#11 Target is not in the sorted right half. Adjust right pointer.
        right = mid - 1;
      }
    }
     //#12 End of loop iteration. Continue search.
  }

  //#13 Loop finished, target not found. Return -1.
  return -1; // Target not found
}


// Old step generation function (for reference)
export function search_OldSteps(p: SearchInput): ProblemState[] {
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
    // This visualization logic will be replaced by StepLoggerV2
    v.push(asArray("nums", nums, left, right, mid));
    v.push(...asSimpleValue({ target, result }));
    steps.push(step);
  }

  log(1); // BP 1: Start

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    log(2, mid); // BP 2: Loop entry, mid calculated

    if (nums[mid] === target) {
      result = mid;
      log(3, mid); // BP 3: Target found
      return steps;
    }

    if (nums[left] <= nums[mid]) { // Left sorted
      log(4, mid); // BP 4: Left half sorted check
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
        log(5); // BP 5: Target in left half, update right
      } else {
        left = mid + 1;
        log(6); // BP 6: Target not in left half, update left
      }
    } else { // Right sorted
      log(7); // BP 7: Right half sorted check
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
        log(8); // BP 8: Target in right half, update left
      } else {
        right = mid - 1;
        log(9); // BP 9: Target not in right half, update right
      }
    }
  }

  // Target not found after loop
  result = -1; // Ensure result is -1 if loop finishes without finding target
  log(10); // BP 10: Target not found, loop finished

  return steps;
}

// Code string for display - breakpoints need to be added/updated
const code = `function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  //#1 Initialize pointers. Start binary search loop.
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    //#2 Calculated middle index.

    //#3 Check if middle element is the target.
    if (nums[mid] === target) {
      //#4 Target found at mid. Return index.
      return mid;
    }

    //#5 Determine which half is normally sorted. Check if left half (nums[left] to nums[mid]) is sorted.
    if (nums[left] <= nums[mid]) { // Left half is sorted
      //#6 Left half is sorted. Check if target is within this sorted range.
      if (nums[left] <= target && target < nums[mid]) {
        //#7 Target is in the sorted left half. Adjust right pointer.
        right = mid - 1;
      } else {
        //#8 Target is not in the sorted left half. Adjust left pointer.
        left = mid + 1;
      }
    } else { // Right half must be sorted
      //#9 Right half is sorted. Check if target is within this sorted range.
      if (nums[mid] < target && target <= nums[right]) {
        //#10 Target is in the sorted right half. Adjust left pointer.
        left = mid + 1;
      } else {
        //#11 Target is not in the sorted right half. Adjust right pointer.
        right = mid - 1;
      }
    }
     //#12 End of loop iteration. Continue search.
  }

  //#13 Loop finished, target not found. Return -1.
  return -1;
}`;

const title = "Search in Rotated Sorted Array";
// getInput is usually defined in testcase.ts
// const getInput = () => { ... };

// Problem definition will be moved to problem.ts
export const problem: Problem<SearchInput /*, ProblemState removed */ > = {
  title,
  emoji: '🔍',
  code, // Reference the code string defined above
  // func: search_OldSteps, // func is usually removed, rely on generateSteps
  id: "search-in-rotated-sorted-array",
  tags: ["Array", "Binary Search"], // Corrected tags
};
