import { ProblemState } from "algo-lens-core";
import { StepLogger } from "../../core/StepLogger"; // Assuming StepLogger is in core
import { ThreeSumInput } from "./types";
// Import group names - adjust if groups.ts exports differently
import { groups } from "./groups";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import _ = require("lodash");

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
  l.arrayV2({ nums: nums }, {});
  l.simple({ target });
  l.array2d("result", result);
  l.hashset("seen", seen, undefined!);
  l.comment = "Initial state before sorting";
  l.comment = "Inspect the initial state of the input array before sorting.";
  l.breakpoint(1);
  l.comment = "Initial state before sorting";

  nums.sort((a, b) => a - b); // Sort the array

  // State after sorting
  l.arrayV2({ nums: nums }, {});
  l.simple({ target });
  l.array2d("result", result);
  l.comment = "Array sorted";
  l.comment = "Inspect the state after sorting the input array.";
  l.breakpoint(2);

  for (let i = 0; i < nums.length - 2; i++) {
    l.arrayV2({ nums: nums }, { i: i });
    l.simple({ target });
    l.array2d("result", result);
    l.comment =
      "Inspect the current index and state before processing the triplet.";
    l.breakpoint(3);

    if (i > 0 && nums[i] === nums[i - 1]) {
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ target });
      l.array2d("result", result);
      l.comment = "Inspect the state when skipping duplicates.";
      l.breakpoint(4);

      continue; // Skip duplicates
    }

    let left = i + 1;
    let right = nums.length - 1;

    l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
    l.simple({ target });
    l.array2d("result", result);
    l.comment = "Inspect the state before entering the two-pointer search.";
    l.breakpoint(5);

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      const triplet = [nums[i], nums[left], nums[right]];
      const tripletMap = { i: nums[i], left: nums[left], right: nums[right] };

      l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
      l.simple({ target });
      l.group("triplet", tripletMap);
      l.simple({ sum });
      l.array2d("result", result);
      l.comment = "Inspect the current triplet and sum calculated.";
      l.breakpoint(6);

      if (sum === target) {
        const tripletKey = triplet.join(",");

        // Add seen set visualization if StepLogger supports it
        // l.set('seen', seen);
        l.comment = "Inspect the state when a valid triplet is found.";
        l.breakpoint(7);

        if (!seen.has(tripletKey)) {
          seen.add(tripletKey);
          result.push(triplet);

          l.hashset("seen", seen, undefined!);
          l.grid("result", result);
          l.comment =
            "Inspect the state after adding a new triplet to the result.";
          l.breakpoint(8);
        }

        // Skip duplicates for left pointer
        let skippedLeft = false;
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
          skippedLeft = true;
        }
        if (skippedLeft) {
          l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
          l.simple({ target });
          l.group("triplet", triplet);
          l.simple({ sum });
          l.array2d("result", result);
          l.comment = `Inner loop: Skipped duplicate left pointers, new left = ${left}`;
          l.comment =
            "Inspect the state after skipping duplicate left pointers.";
          l.breakpoint(9);
        }

        // Skip duplicates for right pointer
        let skippedRight = false;
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
          skippedRight = true;
        }
        if (skippedRight) {
          l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
          l.simple({ target });
          l.group("triplet", triplet);
          l.simple({ sum });
          l.array2d("result", result);
          l.comment = `Inner loop: Skipped duplicate right pointers, new right = ${right}`;
          l.comment =
            "Inspect the state after skipping duplicate right pointers.";
          l.breakpoint(10);
        }

        l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
        l.simple({ target });
        l.group("triplet", triplet);
        l.simple({ sum });
        l.array2d("result", result);
        l.comment = `Inner loop: Moving pointers after finding target sum`;
        l.comment = "Inspect the state after moving both pointers.";
        l.breakpoint(11);

        left++;
        right--;

        l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
        l.simple({ target });
        l.group("triplet", triplet);
        l.simple({ sum });
        // Don't log triplet/sum here as they are recalculated at the start of the next iteration
        l.array2d("result", result);
        l.hide("triplet");
        l.comment = "Inspect the state after recalculating the triplet.";
        l.breakpoint(12);
      } else if (sum < target) {
        l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
        l.simple({ target });
        l.group("triplet", triplet);
        l.simple({ sum });
        l.array2d("result", result);

        l.comment = "Inspect the state when the sum is less than the target.";
        l.breakpoint(13);
        left++;
      } else {
        // sum > target

        l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
        l.simple({ target });
        l.group("triplet", triplet);
        l.simple({ sum });
        l.array2d("result", result);
        l.comment =
          "Inspect the state when the sum is greater than the target.";
        l.breakpoint(14);
        right--;
      }
    }
    // Log state at the end of the inner loop for the current 'i'
    l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
    l.simple({ target });
    l.array2d("result", result);
    l.comment =
      "Inspect the state at the end of the inner loop for the current index.";
    l.breakpoint(15);
  }

  l.arrayV2({ nums: nums }, {});
  l.simple({ target });
  l.array2d("result", result);
  l.comment = "Finished searching for triplets";
  l.comment = "Inspect the final state after processing all triplets.";
  l.breakpoint(16);

  return l.getSteps();
}
