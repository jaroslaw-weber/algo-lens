import { ProblemState, Variable } from "algo-lens-core";
import { asArray, asSimpleValue } from "algo-lens-core/src/utils"; // Assuming path is correct
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
  l.arrayV3({ nums }, [
    { label: "left", value: left, color: "info" },
    { label: "right", value: right, color: "info" },
  ]);
  l.simple({ target });
  l.simple({ result });
  l.comment =
    "Initialize the 'left' pointer to the start of the array and the 'right' pointer to the end of the array. The 'result' is initialized to -1, indicating the target has not been found yet. The 'target' is the value we are searching for.";
  l.breakpoint(1);

  // Main loop to find the target number in the rotated array
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    l.simple({ mid });
    l.arrayV3({ nums }, [
      { label: "left", value: left, color: "info" },
      { label: "right", value: right, color: "info" },
      { label: "mid", value: mid, color: "primary" },
    ]);
    // We find the middle spot to split the current search area in half.
    l.comment = `Calculate middle index 'mid'. Value: ${nums[mid]}.`;
    l.breakpoint(2);

    if (nums[mid] === target) {
      result = mid;
      l.simple({ result });
      l.arrayV3({ nums }, [
        { label: "left", value: left, color: "info" },
        { label: "right", value: right, color: "info" },
        { label: "found", value: mid, color: "success" },
      ]);
      l.comment = `Check if mid value equals target.`;
      l.breakpoint(3);
      return l.getSteps();
    }

    if (nums[left] <= nums[mid]) {
      l.arrayV3({ nums }, [
        { label: "left", value: left, color: "info" },
        { label: "right", value: right, color: "info" },
        { label: "mid", value: mid, color: "primary" },
      ]);
      // Check if the left side of our current search area (from 'left' to 'mid') is sorted correctly.
      // Check if the left side (from 'left' to 'mid') is sorted.
      l.comment = `Determine sorted half. Left half sorted?`;
      l.breakpoint(4);
      // If the left side is sorted, we see if the target is in this sorted range.
      if (nums[left] <= target && target < nums[mid]) {
        // If the target is in the sorted left part, we can ignore the right side.
        // We move 'right' to search only in the left part.
        const oldRight = right;
        right = mid - 1;
        l.simple({ right });
        l.arrayV3({ nums: nums }, [
          { label: "left", value: left, color: "info" },
          { label: "new right", value: right, color: "warning" },
        ]);
        l.comment = `Left half sorted. Target in range. Discard right.`;
        l.breakpoint(5);
      } else {
        // If the target is not in the sorted left part, it must be in the right part (which might be rotated).
        // We ignore the left part and move 'left' to search in the right part.
        const oldLeft = left;
        left = mid + 1;
        l.simple({ left: left });
        l.arrayV3({ nums: nums }, [
          { label: "new left", value: left, color: "warning" },
          { label: "right", value: right, color: "info" },
        ]);
        l.comment = `Left half sorted. Target not in range. Discard left.`;
        l.breakpoint(6);
      }
    } else {
      l.arrayV3({ nums: nums }, [
        { label: "left", value: left, color: "info" },
        { label: "right", value: right, color: "info" },
        { label: "mid", value: mid, color: "primary" },
      ]);
      // If the left side is not sorted, the right side (from 'mid' to 'right') must be sorted because the array is rotated.
      l.comment =
        "The left half of the array is not sorted. This implies that the right half of the array must be sorted because the array is a rotated sorted array.";
      l.breakpoint(7);
      // Since the right side is sorted, we see if the target is in this sorted range.
      if (nums[mid] < target && target <= nums[right]) {
        // If the target is in the sorted right part, we can ignore the left side.
        // We move 'left' to search only in the right part.
        const oldLeft = left;
        left = mid + 1;
        l.simple({ left: left });
        l.arrayV3({ nums: nums }, [
          { label: "new left", value: left, color: "warning" },
          { label: "right", value: right, color: "info" },
        ]);
        l.comment = `Right half sorted. Target in range. Discard left.`;
        l.breakpoint(8);
      } else {
        // If the target is NOT in the sorted right part, it must be in the left part (which might be rotated).
        // We ignore the right part and move 'right' to search in the left part.
        const oldRight = right;
        right = mid - 1;
        l.simple({ right: right });
        l.arrayV3({ nums: nums }, [
          { label: "left", value: left, color: "info" },
          { label: "new right", value: right, color: "warning" },
        ]);
        l.comment = `Right half sorted. Target not in range. Discard right.`;
        l.breakpoint(9);
      }
    }
    // We clear 'mid' for the next check.
    l.simple({ mid: undefined });
  }

  // If the loop finishes, the target was not found.
  // We set the result to -1.
  result = -1; // Explicitly set result to -1 if loop finishes without finding target
  l.simple({ result });
  l.arrayV3({ nums: nums }, [
    { label: "left", value: left, color: "info" },
    { label: "right", value: right, color: "info" },
  ]);
  l.comment =
    "The loop has finished without finding the target. This occurs when the search range [left, right] becomes empty (left > right). The result remains -1, indicating the target is not present in the array.";
  l.breakpoint(10);

  return l.getSteps();
}
