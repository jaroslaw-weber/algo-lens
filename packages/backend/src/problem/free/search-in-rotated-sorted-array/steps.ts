import { ProblemState, Variable } from "algo-lens-core";
import { SearchInput } from "./types";
import { asNumsArray, asTargetAndResult } from "./variables";

/**
 * Implements the search algorithm which finds a target number in a rotated sorted array.
 * Generates steps for visualization.
 * @param p - The input parameters including an array of numbers and a target number.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function searchSteps(p: SearchInput): ProblemState[] {
  const { nums, target } = p;
  const steps: ProblemState[] = [];
  let left = 0;
  let right = nums.length - 1;
  let result = -1; // Initialize result

  // Helper function to create and log each step's computational state
  function log(point: number, mid?: number) {
    const variables: Variable[] = [
      asNumsArray(nums, left, right, mid),
      ...asTargetAndResult(target, result), // Spread the result of asTargetAndResult
    ];
    steps.push({ breakpoint: point, variables });
  }

  // Initial state log before the loop starts
  log(1); // #1

  // Main loop to find the target number in the rotated array
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    log(2, mid); // #2

    if (nums[mid] === target) {
      result = mid;
      log(3, mid); // #3
      // Found the target, push final state and return
      steps.push({ breakpoint: 10, variables: [asNumsArray(nums, left, right, mid), ...asTargetAndResult(target, result)] }); // Explicit final log #10
      return steps;
    }

    // Determine which half is sorted
    if (nums[left] <= nums[mid]) { // Left half is sorted
      log(4, mid); // #4
      if (nums[left] <= target && target < nums[mid]) { // Target is in the sorted left half
        right = mid - 1;
        log(5, mid); // #5 (Log after update)
      } else { // Target is in the unsorted right half
        left = mid + 1;
        log(6, mid); // #6 (Log after update)
      }
    } else { // Right half is sorted
      log(7, mid); // #7
      if (nums[mid] < target && target <= nums[right]) { // Target is in the sorted right half
        left = mid + 1;
        log(8, mid); // #8 (Log after update)
      } else { // Target is in the unsorted left half
        right = mid - 1;
        log(9, mid); // #9 (Log after update)
      }
    }
     // Log state at the end of the loop iteration (optional, could be combined with 5/6/8/9)
     // log(point_after_pointer_update, mid); 
  }

  // Target not found after loop finishes
  result = -1;
  log(10); // #10

  return steps;
}
