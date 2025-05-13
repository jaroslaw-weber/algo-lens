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
  l.comment = "Initial state: left, right, target, and result = -1.";
  l.breakpoint(1);

  // Main loop to find the target number in the rotated array
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    l.simple({ mid });
    l.arrayV2({ nums }, { left, right, mid });
    // We find the middle spot to split the current search area in half.
    l.comment = `Found the middle index: mid = ${mid}. The number here is nums[mid] = ${nums[mid]}.`;
    l.breakpoint(2);

    if (nums[mid] === target) {
      result = mid;
      l.simple({ result });
      l.arrayV2({ nums }, { left, right, mid });
      l.comment = `Target found at mid. result = ${mid}. Returning. Target: ${target}.`;
      l.breakpoint(3);
      return l.getSteps();
    }

    if (nums[left] <= nums[mid]) {
      l.arrayV2({ nums }, { left, right, mid });
      // Check if the left side of our current search area (from 'left' to 'mid') is sorted correctly.
     // Check if the left side (from 'left' to 'mid') is sorted.
     l.comment = `Is the left part sorted? We check if nums[left] (${nums[left]}) is <= nums[mid] (${nums[mid]}).`;
     l.breakpoint(4);
     // If the left side is sorted, we see if the target is in this sorted range.
     if (nums[left] <= target && target < nums[mid]) {
       // If the target is in the sorted left part, we can ignore the right side.
       // We move 'right' to search only in the left part.
       const oldRight = right;
       right = mid - 1;
       l.simple({ right });
       l.arrayV2({ nums: nums }, { left: left, right: right });
       l.comment = `Yes, the left part is sorted. Target (${target}) is between ${nums[left]} and ${nums[mid]}. This means the target is in the left part. We move the 'right' pointer to ${mid} - 1 = ${right} to search only in this left part.`;
       l.breakpoint(5);
     } else {
       // If the target is not in the sorted left part, it must be in the right part (which might be rotated).
       // We ignore the left part and move 'left' to search in the right part.
       const oldLeft = left;
       left = mid + 1;
       l.simple({ left: left });
       l.arrayV2({ nums: nums }, { left: left, right: right });
       l.comment = `Yes, the left part is sorted, but target (${target}) is not in it. This means the target must be in the right part (which could be rotated). We move the 'left' pointer to ${mid} + 1 = ${left} to search only in this right part.`;
       l.breakpoint(6);
     }
   } else {
     l.arrayV2({ nums: nums }, { left: left, right: right, mid: mid });
     // If the left side is not sorted, the right side (from 'mid' to 'right') must be sorted because the array is rotated.
     l.comment = `No, the left part is not sorted. This means the right part is sorted.`;
     l.breakpoint(7);
     // Since the right side is sorted, we see if the target is in this sorted range.
     if (nums[mid] < target && target <= nums[right]) {
       // If the target is in the sorted right part, we can ignore the left side.
       // We move 'left' to search only in the right part.
       const oldLeft = left;
       left = mid + 1;
       l.simple({ left: left });
       l.arrayV2({ nums: nums }, { left: left, right: right });
       l.comment = `Yes, the right part is sorted. Target (${target}) is between ${nums[mid]} and ${nums[right]}. This means the target is in the right part. We move the 'left' pointer to ${mid} + 1 = ${left} to search only in this right part.`;
       l.breakpoint(8);
     } else {
       // If the target is NOT in the sorted right part, it must be in the left part (which might be rotated).
       // We ignore the right part and move 'right' to search in the left part.
       const oldRight = right;
       right = mid - 1;
       l.simple({ right: right });
       l.arrayV2({ nums: nums }, { left: left, right: right });
       l.comment = `Yes, the right part is sorted, but target (${target}) is not in it. This means the target must be in the left part (which might be rotated). We move the 'right' pointer to ${mid} - 1 = ${right} to search only in this left part.`;
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
 l.comment = "Finished searching. Target not found. Result is -1.";
 l.breakpoint(10);

 return l.getSteps();
}
