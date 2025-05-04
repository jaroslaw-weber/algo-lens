import { defineStep } from "@problem/types/step";
import { Log } from "@problem/types/log";
import { variables } from "./variables";
import { SearchRotatedInput } from "./types";

export const generateSteps = (input: SearchRotatedInput) => {
  const log = new Log();
  const { nums, target } = input;
  let left = 0;
  let right = nums.length - 1;
  let result = -1; // Initialize result

  log.addStep(defineStep({
    label: "Initial State",
    description: "Initialize left and right pointers for binary search.",
    state: {
      [variables.nums.id]: { value: [...nums] },
      [variables.target.id]: { value: target },
      [variables.left.id]: { value: left },
      [variables.right.id]: { value: right },
      [variables.result.id]: { value: result },
    },
    highlights: {
        [variables.nums.id]: { indices: [left, right] }
    }
  }));

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = nums[mid];

    log.addStep(defineStep({
      label: "Calculate Midpoint",
      description: `Calculate mid index: floor((${left} + ${right}) / 2) = ${mid}. Value at mid is ${midValue}.`,
      state: {
        [variables.left.id]: { value: left },
        [variables.right.id]: { value: right },
        [variables.mid.id]: { value: mid },
        [variables.midValue.id]: { value: midValue },
        [variables.result.id]: { value: result },
      },
      highlights: {
        [variables.nums.id]: { indices: [left, right, mid] }
      }
    }));

    if (midValue === target) {
      result = mid;
      log.addStep(defineStep({
        label: "Target Found",
        description: `Target ${target} found at index ${mid}.`,
        state: {
          [variables.left.id]: { value: left },
          [variables.right.id]: { value: right },
          [variables.mid.id]: { value: mid },
          [variables.midValue.id]: { value: midValue },
          [variables.result.id]: { value: result }, // Update result
        },
        highlights: {
          [variables.nums.id]: { indices: [mid] },
           [variables.result.id]: {} // Highlight the result update
        }
      }));
      return log.getSteps(); // Target found, exit
    }

    // Determine which half is sorted
    if (nums[left] <= midValue) { // Left half is sorted
      log.addStep(defineStep({
        label: "Check Left Sorted Half",
        description: `Left half (index ${left} to ${mid}) is normally sorted (nums[${left}]=${nums[left]} <= nums[${mid}]=${midValue}).`,
        state: {
          [variables.left.id]: { value: left },
          [variables.right.id]: { value: right },
          [variables.mid.id]: { value: mid },
           [variables.midValue.id]: { value: midValue },
          [variables.result.id]: { value: result },
        },
         highlights: {
             [variables.nums.id]: { indices: [left, mid] }
         }
      }));

      if (nums[left] <= target && target < midValue) {
        // Target is in the left sorted half
         const oldRight = right;
        right = mid - 1;
        log.addStep(defineStep({
          label: "Adjust Right Pointer",
          description: `Target ${target} is within the sorted left half [${nums[left]}, ${midValue}). Adjust right pointer from ${oldRight} to ${right}.`,
          state: {
            [variables.left.id]: { value: left },
            [variables.right.id]: { value: right },
            [variables.mid.id]: { value: mid },
             [variables.midValue.id]: { value: midValue },
            [variables.result.id]: { value: result },
          },
          highlights: {
             [variables.right.id]: {} // Highlight pointer change
          }
        }));
      } else {
        // Target is in the right unsorted half
         const oldLeft = left;
        left = mid + 1;
        log.addStep(defineStep({
          label: "Adjust Left Pointer",
          description: `Target ${target} is not in the sorted left half. Adjust left pointer from ${oldLeft} to ${left}.`,
          state: {
            [variables.left.id]: { value: left },
            [variables.right.id]: { value: right },
            [variables.mid.id]: { value: mid },
             [variables.midValue.id]: { value: midValue },
            [variables.result.id]: { value: result },
          },
           highlights: {
               [variables.left.id]: {} // Highlight pointer change
            }
        }));
      }
    } else { // Right half must be sorted
       log.addStep(defineStep({
        label: "Check Right Sorted Half",
        description: `Right half (index ${mid} to ${right}) is normally sorted (nums[${left}]=${nums[left]} > nums[${mid}]=${midValue}).`,
        state: {
          [variables.left.id]: { value: left },
          [variables.right.id]: { value: right },
          [variables.mid.id]: { value: mid },
          [variables.midValue.id]: { value: midValue },
          [variables.result.id]: { value: result },
        },
         highlights: {
             [variables.nums.id]: { indices: [mid, right] }
         }
      }));

      if (midValue < target && target <= nums[right]) {
        // Target is in the right sorted half
         const oldLeft = left;
        left = mid + 1;
        log.addStep(defineStep({
          label: "Adjust Left Pointer",
          description: `Target ${target} is within the sorted right half (${midValue}, ${nums[right]}]. Adjust left pointer from ${oldLeft} to ${left}.`,
          state: {
            [variables.left.id]: { value: left },
            [variables.right.id]: { value: right },
            [variables.mid.id]: { value: mid },
            [variables.midValue.id]: { value: midValue },
            [variables.result.id]: { value: result },
          },
           highlights: {
               [variables.left.id]: {} // Highlight pointer change
            }
        }));
      } else {
        // Target is in the left unsorted half
         const oldRight = right;
        right = mid - 1;
         log.addStep(defineStep({
          label: "Adjust Right Pointer",
          description: `Target ${target} is not in the sorted right half. Adjust right pointer from ${oldRight} to ${right}.`,
          state: {
            [variables.left.id]: { value: left },
            [variables.right.id]: { value: right },
            [variables.mid.id]: { value: mid },
            [variables.midValue.id]: { value: midValue },
            [variables.result.id]: { value: result },
          },
           highlights: {
               [variables.right.id]: {} // Highlight pointer change
            }
        }));
      }
    }
  }

  // Target not found after loop
  log.addStep(defineStep({
    label: "Target Not Found",
    description: `Loop finished (left=${left}, right=${right}). Target ${target} not found in the array.`,
    state: {
      [variables.left.id]: { value: left },
      [variables.right.id]: { value: right },
      [variables.result.id]: { value: result }, // Result remains -1
    },
     highlights: {
         [variables.result.id]: {} // Highlight final result
     }
  }));

  return log.getSteps();
};
