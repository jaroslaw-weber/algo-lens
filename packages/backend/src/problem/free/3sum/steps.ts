import { ProblemState } from "algo-lens-core";
import { StepLogger } from "../../core/StepLogger"; // Assuming StepLogger is in core
import { ThreeSumInput } from "./types";
// Import group names - adjust if groups.ts exports differently
import { groups } from "./groups";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import _ = require("lodash");

export function generateSteps(nums: number[]): ProblemState[] {
  const l = new StepLoggerV2();

  const min = _.min(nums);
  const max = _.max(nums);
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
  l.breakpoint(1, "Initial state before sorting");

  nums.sort((a, b) => a - b); // Sort the array

  // State after sorting
  l.arrayV2({ nums: nums }, {});
  l.simple({ target });
  l.array2d("result", result);
  l.breakpoint(2, "Array sorted");

  for (let i = 0; i < nums.length - 2; i++) {
    l.arrayV2({ nums: nums }, { i: i });
    l.simple({ target });
    l.array2d("result", result);
    l.breakpoint(3, `Outer loop: Start iteration with i = ${i}`);

    if (i > 0 && nums[i] === nums[i - 1]) {
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ target });
      l.array2d("result", result);
      l.breakpoint(4, `Outer loop: Skip duplicate i = ${i}`);

      continue; // Skip duplicates
    }

    let left = i + 1;
    let right = nums.length - 1;

    l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
    l.simple({ target });
    l.array2d("result", result);
    l.breakpoint(5, `Inner loop: Initialize left = ${left}, right = ${right}`);

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      const triplet = [nums[i], nums[left], nums[right]];
      const tripletMap = { i: nums[i], left: nums[left], right: nums[right] };

      l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
      l.simple({ target });
      l.group("triplet", tripletMap);
      l.simple({ sum });
      l.array2d("result", result);
      l.breakpoint(
        6,
        `Inner loop: Calculate sum = ${sum} for triplet [${triplet.join(",")}]`
      );

      if (sum === target) {
        const tripletKey = triplet.join(",");

        // Add seen set visualization if StepLogger supports it
        // l.set('seen', seen);
        l.breakpoint(
          7,
          `Inner loop: Found potential triplet [${triplet.join(
            ","
          )}] with sum = ${target}`
        );

        if (!seen.has(tripletKey)) {
          seen.add(tripletKey);
          result.push(triplet);

          l.hashset("seen", seen, undefined!);
          l.grid("result", result);
          l.breakpoint(
            8,
            `Inner loop: Added unique triplet [${triplet.join(",")}] to result`
          );
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
          l.breakpoint(10);
        }

        l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
        l.simple({ target });
        l.group("triplet", triplet);
        l.simple({ sum });
        l.array2d("result", result);
        l.comment = `Inner loop: Moving pointers after finding target sum`;
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
        l.breakpoint(
          12,
          `Inner loop: Moved pointers, new left = ${left}, new right = ${right}`
        );
      } else if (sum < target) {
        l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
        l.simple({ target });
        l.group("triplet", triplet);
        l.simple({ sum });
        l.array2d("result", result);
        l.breakpoint(
          13,
          `Inner loop: Sum ${sum} < target ${target}, incrementing left pointer`
        );
        left++;
      } else {
        // sum > target

        l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
        l.simple({ target });
        l.group("triplet", triplet);
        l.simple({ sum });
        l.array2d("result", result);
        l.breakpoint(
          14,
          `Inner loop: Sum ${sum} > target ${target}, decrementing right pointer`
        );
        right--;
      }
    }
    // Log state at the end of the inner loop for the current 'i'
    l.arrayV2({ nums: nums }, { i: i, left: left, right: right });
    l.simple({ target });
    l.array2d("result", result);
    l.breakpoint(14.5, `Inner loop finished for i = ${i}`); // Added intermediate breakpoint
  }

  l.arrayV2({ nums: nums }, {});
  l.simple({ target });
  l.array2d("result", result);
  l.breakpoint(15, "Finished searching for triplets");

  return l.getSteps();
}
