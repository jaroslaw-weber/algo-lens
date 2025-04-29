import { ProblemState } from "algo-lens-core";
import { StepLogger } from "../../core/StepLogger"; // Assuming StepLogger is in core
import { ThreeSumInput } from "./types";
// Import group names - adjust if groups.ts exports differently
import { groups } from "./groups";

export function generateSteps(p: ThreeSumInput): ProblemState[] {
  const l = new StepLogger();
  const nums = [...p.nums];
  const target = 0;
  const result: number[][] = [];
  const seen = new Set<string>(); // To track unique triplets

  // Initial state before sorting
  l.breakpoint(1, "Initial state before sorting");
  l.array("nums", nums);
  l.simple({ target });
  l.array2d("result", result);
  l.save();

  nums.sort((a, b) => a - b); // Sort the array

  // State after sorting
  l.breakpoint(2, "Array sorted");
  l.array("nums", nums);
  l.simple({ target });
  l.array2d("result", result);
  l.save();

  for (let i = 0; i < nums.length - 2; i++) {
    l.breakpoint(3, `Outer loop: Start iteration with i = ${i}`);
    l.array("nums", nums, i);
    l.simple({ target });
    l.array2d("result", result);
    l.save();

    if (i > 0 && nums[i] === nums[i - 1]) {
      l.breakpoint(4, `Outer loop: Skip duplicate i = ${i}`);
      l.array("nums", nums, i);
      l.simple({ target });
      l.array2d("result", result);
      l.save();
      continue; // Skip duplicates
    }

    let left = i + 1;
    let right = nums.length - 1;

    l.breakpoint(5, `Inner loop: Initialize left = ${left}, right = ${right}`);
    l.array("nums", nums, i, left, right);
    l.simple({ target });
    l.array2d("result", result);
    l.save();

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      const triplet = [nums[i], nums[left], nums[right]];

      l.breakpoint(
        6,
        `Inner loop: Calculate sum = ${sum} for triplet [${triplet.join(",")}]`
      );
      l.array("nums", nums, i, left, right);
      l.simple({ target });
      l.array("triplet", triplet);
      l.simple({ sum });
      l.array2d("result", result);
      l.save();

      if (sum === target) {
        const tripletKey = triplet.join(",");
        l.breakpoint(
          7,
          `Inner loop: Found potential triplet [${triplet.join(
            ","
          )}] with sum = ${target}`
        );
        l.array("nums", nums, i, left, right);
        l.simple({ target });
        l.array("triplet", triplet);
        l.simple({ sum });
        l.array2d("result", result);
        // Add seen set visualization if StepLogger supports it
        // l.set('seen', seen);
        l.save();

        if (!seen.has(tripletKey)) {
          seen.add(tripletKey);
          result.push(triplet);
          l.breakpoint(
            8,
            `Inner loop: Added unique triplet [${triplet.join(",")}] to result`
          );
          l.array("nums", nums, i, left, right);
          l.simple({ target });
          l.array("triplet", triplet);
          l.simple({ sum });
          l.array2d("result", result);
          l.save();
        }

        // Skip duplicates for left pointer
        let skippedLeft = false;
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
          skippedLeft = true;
        }
        if (skippedLeft) {
          l.breakpoint(
            9,
            `Inner loop: Skipped duplicate left pointers, new left = ${left}`
          );
          l.array("nums", nums, i, left, right);
          l.simple({ target });
          l.array("triplet", triplet);
          l.simple({ sum });
          l.array2d("result", result);
          l.save();
        }

        // Skip duplicates for right pointer
        let skippedRight = false;
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
          skippedRight = true;
        }
        if (skippedRight) {
          l.breakpoint(
            10,
            `Inner loop: Skipped duplicate right pointers, new right = ${right}`
          );
          l.array("nums", nums, i, left, right);
          l.simple({ target });
          l.array("triplet", triplet);
          l.simple({ sum });
          l.array2d("result", result);
          l.save();
        }

        l.breakpoint(
          11,
          `Inner loop: Moving pointers after finding target sum`
        );
        l.array("nums", nums, i, left, right);
        l.simple({ target });
        l.array("triplet", triplet);
        l.simple({ sum });
        l.array2d("result", result);
        l.save();

        left++;
        right--;

        l.breakpoint(
          12,
          `Inner loop: Moved pointers, new left = ${left}, new right = ${right}`
        );
        l.array("nums", nums, i, left, right);
        l.simple({ target });
        l.array("triplet", triplet);
        l.simple({ sum });
        // Don't log triplet/sum here as they are recalculated at the start of the next iteration
        l.array2d("result", result);
        l.save();
      } else if (sum < target) {
        l.breakpoint(
          13,
          `Inner loop: Sum ${sum} < target ${target}, incrementing left pointer`
        );
        l.array("nums", nums, i, left, right);
        l.simple({ target });
        l.array("triplet", triplet);
        l.simple({ sum });
        l.array2d("result", result);
        l.save();
        left++;
      } else {
        // sum > target
        l.breakpoint(
          14,
          `Inner loop: Sum ${sum} > target ${target}, decrementing right pointer`
        );
        l.array("nums", nums, i, left, right);
        l.simple({ target });
        l.array("triplet", triplet);
        l.simple({ sum });
        l.array2d("result", result);
        l.save();
        right--;
      }
    }
    // Log state at the end of the inner loop for the current 'i'
    l.breakpoint(14.5, `Inner loop finished for i = ${i}`); // Added intermediate breakpoint
    l.array("nums", nums, i, left, right);
    l.simple({ target });
    l.array2d("result", result);
    l.save();
  }

  l.breakpoint(15, "Finished searching for triplets");
  l.array("nums", nums);
  l.simple({ target });
  l.array2d("result", result);
  l.save();

  return l.getSteps();
}
