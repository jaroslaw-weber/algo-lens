import { StepLoggerV2 } from '@algo-lens/problem-template';
import type { SearchRotatedSortedArrayInput } from './types';

export function generateSteps(p: SearchRotatedSortedArrayInput) {
  const l = new StepLoggerV2();
  const { nums, target } = p;

  let left = 0;
  let right = nums.length - 1;
  let result = -1; // Initialize result to -1 (not found)

  // Initial state logging
  l.array('nums', nums);
  l.simple('target', target);
  l.simple('left', left);
  l.simple('right', right);
  l.simple('result', result);
  l.snapshot('Initial state');

  // Breakpoint #1: After initialization, before loop starts
  l.breakpoint(1);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // Log state at the beginning of the loop iteration
    l.simple('left', left);
    l.simple('right', right);
    l.simple('mid', mid);
    l.array('nums', nums, [ // Highlight pointers
        { ptr: left, label: 'L' },
        { ptr: right, label: 'R' },
        { ptr: mid, label: 'M', color: 'secondary' }
    ]);
    l.snapshot(`Loop start: left=${left}, right=${right}, mid=${mid}`);

    // Breakpoint #2: Calculated middle index
    l.breakpoint(2);

    // Breakpoint #3: Check if middle element is the target
    l.snapshot(`Checking if nums[${mid}] (${nums[mid]}) === target (${target})`);
    l.breakpoint(3);
    if (nums[mid] === target) {
      result = mid;
      l.simple('result', result);
      l.array('nums', nums, [ // Highlight found element
          { ptr: left, label: 'L' },
          { ptr: right, label: 'R' },
          { ptr: mid, label: 'M', color: 'success' }
      ]);
      l.snapshot(`Target found at index ${mid}`);
      // Breakpoint #4: Target found at mid. Return index.
      l.breakpoint(4);
      break; // Exit loop
    }

    // Breakpoint #5: Determine which half is normally sorted. Check if left half is sorted.
    l.snapshot(`Checking if left half (nums[${left}] <= nums[${mid}]) is sorted: ${nums[left]} <= ${nums[mid]} -> ${nums[left] <= nums[mid]}`);
    l.breakpoint(5);
    if (nums[left] <= nums[mid]) { // Left half is sorted
      // Breakpoint #6: Left half is sorted. Check if target is within this sorted range.
      l.snapshot(`Left half sorted. Checking if target (${target}) is between nums[${left}] (${nums[left]}) and nums[${mid}] (${nums[mid]})`);
      l.breakpoint(6);
      if (nums[left] <= target && target < nums[mid]) {
        // Breakpoint #7: Target is in the sorted left half. Adjust right pointer.
        l.snapshot(`Target is in sorted left half. Updating right = mid - 1 = ${mid - 1}`);
        l.breakpoint(7);
        right = mid - 1;
      } else {
        // Breakpoint #8: Target is not in the sorted left half. Adjust left pointer.
        l.snapshot(`Target is not in sorted left half. Updating left = mid + 1 = ${mid + 1}`);
        l.breakpoint(8);
        left = mid + 1;
      }
    } else { // Right half must be sorted
       // Breakpoint #9: Right half is sorted. Check if target is within this sorted range.
       l.snapshot(`Right half sorted. Checking if target (${target}) is between nums[${mid}] (${nums[mid]}) and nums[${right}] (${nums[right]})`);
       l.breakpoint(9);
      if (nums[mid] < target && target <= nums[right]) {
        // Breakpoint #10: Target is in the sorted right half. Adjust left pointer.
        l.snapshot(`Target is in sorted right half. Updating left = mid + 1 = ${mid + 1}`);
        l.breakpoint(10);
        left = mid + 1;
      } else {
        // Breakpoint #11: Target is not in the sorted right half. Adjust right pointer.
        l.snapshot(`Target is not in sorted right half. Updating right = mid - 1 = ${mid - 1}`);
        l.breakpoint(11);
        right = mid - 1;
      }
    }
    // Log state after pointer update, before next iteration
    l.simple('left', left);
    l.simple('right', right);
    l.snapshot(`End of iteration: left=${left}, right=${right}`);
    // Breakpoint #12: End of loop iteration. Continue search.
    l.breakpoint(12);
  }

  // Breakpoint #13: Loop finished. If result is still -1, target not found.
  l.simple('result', result); // Log final result index
  if (result === -1) {
      l.snapshot(`Loop finished. Target ${target} not found.`);
  } else {
      l.snapshot(`Loop finished. Target ${target} found at index ${result}.`);
  }
  l.breakpoint(13);

  return l.getSteps();
}
