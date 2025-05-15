import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Adjusted path
import { MaximumSubarrayInput } from "./types";
import { groups } from "./groups"; // Import groups
import _, { sum } from "lodash"; // Import sum for potential range calculation if needed

export function generateSteps(nums: number[]): ProblemState[] {
  const l = new StepLoggerV2();
  l.groupOptions.set("comparision", {
    min: _.min(nums),
    max: _.max(nums),
  });

  let maxEndingHere = nums[0];
  let maxSoFar = nums[0];

  // Log initial state
  l.arrayV2({ nums: nums }, {});
  l.group("comparision", { maxEndingHere, maxSoFar });
  l.breakpoint(1);
  l.comment = `Start with maxEndingHere and maxSoFar equal to the first number.`;

  // Iterate through the array starting from the second element.
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    // Log state at the beginning of the loop
    l.arrayV2({ nums: nums }, { i: i }); // Highlight current number

    // Kadane's logic: Decide whether to extend the current subarray or start a new one.
    const extendSum = maxEndingHere + num;
    const startNew = num;
    // HIDE_START
    l.group("comparision", {
      startNew,
      extendSum,
      maxEndingHere,
      maxSoFar,
      num,
    });
    // HIDE_END
    l.breakpoint(2);
    l.comment = `Look at the current number, which is ${num}.`;


    if (startNew > extendSum) {
      // Log state before updating maxEndingHere
      l.arrayV2({ nums: nums }, { i: i });
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.breakpoint(3);
      l.comment = `Compare starting a new subarray with the current number (${startNew}) to extending the previous one (maxEndingHere + num = ${extendSum}). Starting a new subarray is better.`;

      maxEndingHere = startNew;

      // Log state after updating maxEndingHere
      l.arrayV2({ nums: nums }, { i: i });
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.breakpoint(4);
      l.comment = `maxEndingHere is now ${maxEndingHere}.`;
    } else {
      // Log state before updating maxEndingHere
      l.arrayV2({ nums: nums }, { i: i });
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.breakpoint(5);
      l.comment = `Compare starting a new subarray with the current number (${startNew}) to extending the previous one (maxEndingHere + num = ${extendSum}). Extending the previous subarray is better or equal.`;

      maxEndingHere = extendSum;

      // Log state after updating maxEndingHere
      l.arrayV2({ nums: nums }, { i: i });
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.breakpoint(6);
      l.comment = `maxEndingHere is now ${maxEndingHere}.`;
    }

    // Update maxSoFar
    // Log state before updating maxSoFar
    l.arrayV2({ nums: nums }, { i: i });
    // HIDE_START
    l.group("comparision", {
      startNew,
      extendSum,
      maxEndingHere,
      maxSoFar,
      num,
    });
    // HIDE_END
    l.breakpoint(7);
    l.comment = `Check if the current maximum sum ending here (${maxEndingHere}) is greater than the overall maximum sum found so far (${maxSoFar}).`;

    if (maxEndingHere > maxSoFar) {
      // Log state before updating maxSoFar
      l.arrayV2({ nums: nums }, { i: i });
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.breakpoint(8);
      l.comment = `Compare the current maximum sum ending here (${maxEndingHere}) with the overall maximum sum found so far (${maxSoFar}). A new overall maximum sum is found.`;

      maxSoFar = maxEndingHere;

      // Log state after updating maxSoFar
      l.arrayV2({ nums: nums }, { i: i });
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.breakpoint(9);
      l.comment = `maxSoFar is updated to ${maxSoFar}.`;
    } else {
      // Log state if maxSoFar is not updated
      l.arrayV2({ nums: nums }, { i: i });
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.breakpoint(10);
      l.comment = `Compare the current maximum sum ending here (${maxEndingHere}) with the overall maximum sum found so far (${maxSoFar}). The overall maximum sum remains ${maxSoFar}.`;
    }
    // End of loop iteration
  }

  // Final state log
  l.arrayV2({ nums: nums }, {});
  l.group("comparision", { maxEndingHere, maxSoFar });
  l.breakpoint(11);
  l.comment = `All numbers processed. The final maximum subarray sum is ${maxSoFar}.`;

  return l.getSteps();
}
