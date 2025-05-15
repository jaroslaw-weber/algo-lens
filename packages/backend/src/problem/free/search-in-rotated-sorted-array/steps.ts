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
  l.comment = "Initialize the 'left' pointer to the start of the array and the 'right' pointer to the end of the array. The 'result' is initialized to -1, indicating the target has not been found yet. The 'target' is the value we are searching for.";
  l.breakpoint(1);

  // Main loop to find the target number in the rotated array
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    l.simple({ mid });
    l.arrayV2({ nums }, { left, right, mid });
    // We find the middle spot to split the current search area in half.
    l.comment = `Calculate the middle index ('mid') of the current search range. This divides the search space in half. The value at the middle is ${nums[mid]}.`;
    l.breakpoint(2);

    if (nums[mid] === target) {
      result = mid;
      l.simple({ result });
      l.arrayV2({ nums }, { left, right, mid });
      l.comment = `Check if the value at the middle (${nums[mid]}) is equal to the target (${target}). If it is, the target is found. Set 'result' to the middle index and terminate the search.`;
      l.breakpoint(3);
      return l.getSteps();
    }

    if (nums[left] <= nums[mid]) {
      l.arrayV2({ nums }, { left, right, mid });
      // Check if the left side of our current search area (from 'left' to 'mid') is sorted correctly.
     // Check if the left side (from 'left' to 'mid') is sorted.
     l.comment = `Determine which half of the array is sorted. Check if the value at the 'left' pointer (${nums[left]}) is less than or equal to the value at the 'mid' pointer (${nums[mid]}). If true, the left half is sorted.`;
     l.breakpoint(4);
     // If the left side is sorted, we see if the target is in this sorted range.
     if (nums[left] <= target && target < nums[mid]) {
       // If the target is in the sorted left part, we can ignore the right side.
       // We move 'right' to search only in the left part.
       const oldRight = right;
       right = mid - 1;
       l.simple({ right });
       l.arrayV2({ nums: nums }, { left: left, right: right });
       l.comment = `The left half of the array is sorted. Check if the target (${target}) falls within the range of values in this sorted left half (between ${nums[left]} and ${nums[mid]}). If it does, the target must be in this left half. Discard the right half by moving the 'right' pointer.`;
       l.breakpoint(5);
     } else {
       // If the target is not in the sorted left part, it must be in the right part (which might be rotated).
       // We ignore the left part and move 'left' to search in the right part.
       const oldLeft = left;
       left = mid + 1;
       l.simple({ left: left });
       l.arrayV2({ nums: nums }, { left: left, right: right });
       l.comment = `The left half of the array is sorted, but the target (${target}) is not within its range. This means the target must be in the right half, which might be rotated. Discard the left half by moving the 'left' pointer.`;
       l.breakpoint(6);
     }
   } else {
     l.arrayV2({ nums: nums }, { left: left, right: right, mid: mid });
     // If the left side is not sorted, the right side (from 'mid' to 'right') must be sorted because the array is rotated.
     l.comment = "The left half of the array is not sorted. This implies that the right half of the array must be sorted because the array is a rotated sorted array.";
     l.breakpoint(7);
     // Since the right side is sorted, we see if the target is in this sorted range.
     if (nums[mid] < target && target <= nums[right]) {
       // If the target is in the sorted right part, we can ignore the left side.
       // We move 'left' to search only in the right part.
       const oldLeft = left;
       left = mid + 1;
       l.simple({ left: left });
       l.arrayV2({ nums: nums }, { left: left, right: right });
       l.comment = `The right half of the array is sorted. Check if the target (${target}) falls within the range of values in this sorted right half (between ${nums[mid]} and ${nums[right]}). If it does, the target must be in this right half. Discard the left half by moving the 'left' pointer.`;
       l.breakpoint(8);
     } else {
       // If the target is NOT in the sorted right part, it must be in the left part (which might be rotated).
       // We ignore the right part and move 'right' to search in the left part.
       const oldRight = right;
       right = mid - 1;
       l.simple({ right: right });
       l.arrayV2({ nums: nums }, { left: left, right: right });
       l.comment = `The right half of the array is sorted, but the target (${target}) is not within its range. This means the target must be in the left part, which might be rotated. Discard the right half by moving the 'right' pointer.`;
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
 l.arrayV2({ nums: nums }, { left: left, right: right });
 l.comment = "The loop has finished without finding the target. This occurs when the search range [left, right] becomes empty (left > right). The result remains -1, indicating the target is not present in the array.";
 l.breakpoint(10);

 return l.getSteps();
}
