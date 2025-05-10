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
export function generateSteps(nums: number[], target: number): ProblemState[] {
  const l = new StepLoggerV2();
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  // Initial state log before the loop starts
  l.arrayV2({ nums }, { left, right });
  l.simple({ target });
  l.simple({ result });
  l.breakpoint_explanation = "Initial state: left, right, target, and result = -1.";
  l.breakpoint(1);

  // Main loop to find the target number in the rotated array
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    l.simple({ mid });
    l.arrayV2({ nums }, { left, right, mid });
    l.breakpoint_explanation = `Calculated mid = floor((${left} + ${right}) / 2) = ${mid}. nums[mid] = ${nums[mid]}.`;
    l.breakpoint(2);

    if (nums[mid] === target) {
      result = mid;
      l.simple({ result });
      l.arrayV2({ nums }, { left, right, mid });
      l.breakpoint_explanation = `Target found at mid. result = ${mid}. Returning. Target: ${target}.`;
      l.breakpoint(3);
      return l.getSteps();
    }

    if (nums[left] <= nums[mid]) {
      l.arrayV2({ nums }, { left, right, mid });
      l.breakpoint_explanation = `Checking if left part is sorted (nums[left] <= nums[mid]). nums[${left}] (${nums[left]}) <= nums[${mid}] (${nums[mid]}).`;
      l.breakpoint(4);
      //Check if the left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        //#5 If the target is in the left half, move the right pointer
        const oldRight = right;
        right = mid - 1;
        l.simple({ right });
        l.arrayV2({ nums: nums }, { left: left, right: right });
        l.breakpoint_explanation = `Left part is sorted. Target (${target}) is in the left part (nums[${left}] (${nums[left]}) <= target < nums[${mid}] (${nums[mid]})). Updating right = ${mid} - 1 = ${right}.`;
        l.breakpoint(5);
      } else {
        //#6 If the target is not in the left half, move the left pointer
        const oldLeft = left;
        left = mid + 1;
        l.simple({ left: left });
        l.arrayV2({ nums: nums }, { left: left, right: right });
        l.breakpoint_explanation = `Left part is sorted. Target (${target}) is not in the left part. Updating left = ${mid} + 1 = ${left}.`;
        l.breakpoint(6);
      }
    } else {
      l.arrayV2({ nums: nums }, { left: left, right: right, mid: mid });
      l.breakpoint_explanation = `Right part is sorted (nums[left] > nums[mid]). nums[${left}] (${nums[left]}) > nums[${mid}] (${nums[mid]}).`;
      l.breakpoint(7);
      //#7 Check if the right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        //#8 If the target is in the right half, move the left pointer
        const oldLeft = left;
        left = mid + 1;
        l.simple({ left: left });
        l.arrayV2({ nums: nums }, { left: left, right: right });
        l.breakpoint_explanation = `Right part is sorted. Target (${target}) is in the right part (nums[${mid}] (${nums[mid]}) < target <= nums[${right}] (${nums[right]})). Updating left = ${mid} + 1 = ${left}.`;
        l.breakpoint(8);
      } else {
        //#9 If the target is not in the right half, move the right pointer
        const oldRight = right;
        right = mid - 1;
        l.simple({ right: right });
        l.arrayV2({ nums: nums }, { left: left, right: right });
        l.breakpoint_explanation = `Right part is sorted. Target (${target}) is not in the right part. Updating right = ${mid} - 1 = ${right}.`;
        l.breakpoint(9);
      }
    }
    // Ensure mid is cleared if loop continues
    l.simple({ mid: undefined });
  }

  // Logs the final state if the target is not found
  result = -1; // Explicitly set result to -1 if loop finishes without finding target
  l.simple({ result });
  l.arrayV2({ nums: nums }, { left: left, right: right });
  l.breakpoint_explanation = "Loop finished. Target not found. result = -1.";
  l.breakpoint(10);

  return l.getSteps();
}
