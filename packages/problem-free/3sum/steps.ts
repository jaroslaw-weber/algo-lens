import { ProblemState } from "algo-lens-core/src/types";

import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2";
import _ from "lodash";

export function generateSteps(nums: number[]): ProblemState[] {
  const l = new StepLoggerV2();

  let min = Infinity;
  let max = -Infinity;
  for (const num of nums) {
    if (num < min) min = num;
    if (num > max) max = num;
  }
  l.groupOptions.set("triplet", {
    min,
    max,
    reverse: false,
  });
  l.groupOptions.set("result", {
    min,
    max,
    reverse: false,
  });
  const target = 0;
  const result: number[][] = [];
  const seen = new Set<string>(); // To track unique triplets

  // Initial state before sorting
  l.arrayV3({ nums: nums }, []);
  l.simple({ target });
  l.array2d("result", result);
  l.hashset("seen", seen, undefined!);
  l.comment = "Initial state: Inspect the unsorted input array.";
  l.breakpoint(1);

  nums.sort((a, b) => a - b); // Sort the array

  // State after sorting
  l.arrayV3({ nums: nums }, []);
  l.simple({ target });
  l.array2d("result", result);
  l.comment =
    "The array is sorted. Sorting is crucial for the two-pointer approach.";
  l.breakpoint(2);

  for (let i = 0; i < nums.length - 2; i++) {
    l.arrayV3({ nums: nums }, [{ value: i, label: "i", color: "primary" }]);
    l.simple({ target });
    l.array2d("result", result);
    l.comment = `Outer loop: fixed element nums[i] = ${nums[i]}.`;
    l.breakpoint(3);

    if (i > 0 && nums[i] === nums[i - 1]) {
      l.arrayV3({ nums: nums }, [{ value: i, label: "i", color: "warning" }]);
      l.simple({ target });
      l.array2d("result", result);
      l.comment = `Skip duplicate element at index ${i}.`;
      l.breakpoint(4);

      continue; // Skip duplicates
    }

    let left = i + 1;
    let right = nums.length - 1;

    l.arrayV3({ nums: nums }, [
      { value: i, label: "i", color: "primary" },
      { value: left, label: "left", color: "info" },
      { value: right, label: "right", color: "info" },
    ]);
    l.simple({ target });
    l.array2d("result", result);
    l.comment = `Initialize left (${left}) and right (${right}) pointers.`;
    l.breakpoint(5);

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      const triplet = [nums[i], nums[left], nums[right]];
      const tripletMap = { i: nums[i], left: nums[left], right: nums[right] };

      l.arrayV3({ nums: nums }, [
        { value: i, label: "i", color: "primary" },
        { value: left, label: "left", color: "info" },
        { value: right, label: "right", color: "info" },
      ]);
      l.simple({ target });
      l.group("triplet", tripletMap);
      l.simple({ sum });
      l.array2d("result", result);
      l.comment = `Calculate triplet sum: ${sum}.`;
      l.breakpoint(6);

      if (sum === target) {
        const tripletKey = triplet.join(",");

        // Add seen set visualization if StepLogger supports it
        // l.set('seen', seen);
        l.comment = `Sum equals target (0). Found a potential triplet: [${triplet.join(
          ", "
        )}].`;
        l.breakpoint(7);

        if (!seen.has(tripletKey)) {
          seen.add(tripletKey);
          result.push(triplet);

          l.hashset("seen", seen, undefined!);
          l.grid("result", result);
          l.comment = `Triplet [${triplet.join(
            ", "
          )}] is unique. Add it to the result list.`;
          l.breakpoint(8);
        }

        // Skip duplicates for left pointer
        let skippedLeft = false;
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
          skippedLeft = true;
        }
        if (skippedLeft) {
          l.arrayV3({ nums: nums }, [
            { value: i, label: "i", color: "primary" },
            { value: left, label: "left", color: "warning" },
            { value: right, label: "right", color: "info" },
          ]);
          l.simple({ target });
          l.group("triplet", triplet);
          l.simple({ sum });
          l.array2d("result", result);
          l.comment = `Skip duplicate left pointers. New left: ${left}.`;
          l.breakpoint(9);
        }

        // Skip duplicates for right pointer
        let skippedRight = false;
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
          skippedRight = true;
        }
        if (skippedRight) {
          l.arrayV3({ nums: nums }, [
            { value: i, label: "i", color: "primary" },
            { value: left, label: "left", color: "info" },
            { value: right, label: "right", color: "warning" },
          ]);
          l.simple({ target });
          l.group("triplet", triplet);
          l.simple({ sum });
          l.array2d("result", result);
          l.comment = `Skip duplicate right pointers. New right: ${right}.`;
          l.breakpoint(10);
        }

        l.arrayV3({ nums: nums }, [
          { value: i, label: "i", color: "primary" },
          { value: left, label: "left", color: "info" },
          { value: right, label: "right", color: "info" },
        ]);
        l.simple({ target });
        l.group("triplet", triplet);
        l.simple({ sum });
        l.array2d("result", result);
        l.comment = `Move pointers inwards.`;
        l.breakpoint(11);

        left++;
        right--;

        l.arrayV3({ nums: nums }, [
          { value: i, label: "i", color: "primary" },
          { value: left, label: "left", color: "info" },
          { value: right, label: "right", color: "info" },
        ]);
        l.simple({ target });
        l.group("triplet", triplet);
        l.simple({ sum });
        // Don't log triplet/sum here as they are recalculated at the start of the next iteration
        l.array2d("result", result);
        l.hide("triplet");
        l.comment = `Pointers moved. Continue search.`;
        l.breakpoint(12);
      } else if (sum < target) {
        l.arrayV3({ nums: nums }, [
          { value: i, label: "i", color: "primary" },
          { value: left, label: "left", color: "info" },
          { value: right, label: "right", color: "info" },
        ]);
        l.simple({ target });
        l.group("triplet", triplet);
        l.simple({ sum });
        l.array2d("result", result);

        l.comment = `Sum ${sum} < target. Increment left.`;
        l.breakpoint(13);
        left++;
      } else {
        // sum > target

        l.arrayV3({ nums: nums }, [
          { value: i, label: "i", color: "primary" },
          { value: left, label: "left", color: "info" },
          { value: right, label: "right", color: "info" },
        ]);
        l.simple({ target });
        l.group("triplet", triplet);
        l.simple({ sum });
        l.array2d("result", result);
        l.comment = `Sum ${sum} > target. Decrement right.`;
        l.breakpoint(14);
        right--;
      }
    }
    // Log state at the end of the inner loop for the current 'i'
    l.arrayV3({ nums: nums }, [
      { value: i, label: "i", color: "primary" },
      { value: left, label: "left", color: "info" },
      { value: right, label: "right", color: "info" },
    ]);
    l.simple({ target });
    l.array2d("result", result);
    l.comment = `End two-pointer search for nums[i] = ${nums[i]}.`;
    l.breakpoint(15);
  }

  l.arrayV3({ nums: nums }, []);
  l.simple({ target });
  l.array2d("result", result);
  l.comment = "All elements processed. The search for triplets is complete.";
  l.breakpoint(16);

  return l.getSteps();
}
