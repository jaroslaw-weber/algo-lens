import { ProblemState, Variable } from "algo-lens-core";
import { asArray, asSimpleValue } from "../../core/utils"; // Assuming path is correct
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { SearchInput } from "./types";
import { variables } from "./variables";
import { groups } from "./groups";

/**
 * Implements the search algorithm which finds a target number in a rotated sorted array.
 * Generates ProblemState steps for visualization using StepLoggerV2.
 * @param p - The input parameters including an array of numbers and a target number.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function generateSteps(p: SearchInput): ProblemState[] {
  const { nums, target } = p;
  const l = new StepLoggerV2(variables, groups);
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  // Initial state log before the loop starts
  l.arrayV2("nums", nums, { left, right });
  l.simple("target", target);
  l.simple("result", result);
  l.breakpoint(1);

  // Main loop to find the target number in the rotated array
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    l.simple("mid", mid);
    l.arrayV2("nums", nums, { left, right, mid });
    l.breakpoint(2);

    if (nums[mid] === target) {
      result = mid;
      l.simple("result", result);
      l.arrayV2("nums", nums, { left, right, mid });
      l.breakpoint(3);
      return l.getSteps();
    }

    if (nums[left] <= nums[mid]) {
      l.arrayV2("nums", nums, { left, right, mid });
      l.breakpoint(4);
      //Check if the left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        //#5 If the target is in the left half, move the right pointer
        right = mid - 1;
        l.simple("right", right);
        l.arrayV2("nums", nums, { left, right });
        l.breakpoint(5);
      } else {
        //#6 If the target is not in the left half, move the left pointer
        left = mid + 1;
        l.simple("left", left);
        l.arrayV2("nums", nums, { left, right });
        l.breakpoint(6);
      }
    } else {
      l.arrayV2("nums", nums, { left, right, mid });
      l.breakpoint(7);
      //#7 Check if the right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        //#8 If the target is in the right half, move the left pointer
        left = mid + 1;
        l.simple("left", left);
        l.arrayV2("nums", nums, { left, right });
        l.breakpoint(8);
      } else {
        //#9 If the target is not in the right half, move the right pointer
        right = mid - 1;
        l.simple("right", right);
        l.arrayV2("nums", nums, { left, right });
        l.breakpoint(9);
      }
    }
    // Ensure mid is cleared if loop continues
    l.simple("mid", undefined);
  }

  // Logs the final state if the target is not found
  result = -1; // Explicitly set result to -1 if loop finishes without finding target
  l.simple("result", result);
  l.arrayV2("nums", nums, { left, right });
  l.breakpoint(10);

  return l.getSteps();
}
