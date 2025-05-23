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
  l.arrayV3({ nums: nums }, {});
  l.group("comparision", { maxEndingHere, maxSoFar });
  l.comment = `Start with maxEndingHere and maxSoFar equal to the first number.`;
  l.breakpoint(1);

  // Iterate through the array starting from the second element.
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    // Log state at the beginning of the loop
    l.arrayV3(
      { nums: nums },
      { i: { value: i, label: `Current index: ${i}` } }
    ); // Highlight current number

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
    l.comment = `Look at the current number, which is ${num}.`;
    l.breakpoint(2);

    if (startNew > extendSum) {
      // Log state before updating maxEndingHere
      l.arrayV3(
        { nums: nums },
        { i: { value: i, label: `Current index: ${i}` } }
      );
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `Compare starting a new subarray with the current number (${startNew}) to extending the previous one (maxEndingHere + num = ${extendSum}). Starting a new subarray is better.`;

      l.breakpoint(3);
      maxEndingHere = startNew;

      // Log state after updating maxEndingHere
      l.arrayV3(
        { nums: nums },
        { i: { value: i, label: `Current index: ${i}` } }
      );
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `maxEndingHere is now ${maxEndingHere}.`;
      l.breakpoint(4);
    } else {
      // Log state before updating maxEndingHere
      l.arrayV3(
        { nums: nums },
        { i: { value: i, label: `Current index: ${i}` } }
      );
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `Compare starting a new subarray with the current number (${startNew}) to extending the previous one (maxEndingHere + num = ${extendSum}). Extending the previous subarray is better or equal.`;

      l.breakpoint(5);
      maxEndingHere = extendSum;

      // Log state after updating maxEndingHere
      l.arrayV3(
        { nums: nums },
        { i: { value: i, label: `Current index: ${i}` } }
      );
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `maxEndingHere is now ${maxEndingHere}.`;
      l.breakpoint(6);
    }

    // Update maxSoFar
    // Log state before updating maxSoFar
    l.arrayV3(
      { nums: nums },
      { i: { value: i, label: `Current index: ${i}` } }
    );
    // HIDE_START
    l.group("comparision", {
      startNew,
      extendSum,
      maxEndingHere,
      maxSoFar,
      num,
    });
    // HIDE_END
    l.comment = `Check if the current maximum sum ending here (${maxEndingHere}) is greater than the overall maximum sum found so far (${maxSoFar}).`;

    l.breakpoint(7);
    if (maxEndingHere > maxSoFar) {
      // Log state before updating maxSoFar
      l.arrayV3(
        { nums: nums },
        { i: { value: i, label: `Current index: ${i}` } }
      );
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `Compare the current maximum sum ending here (${maxEndingHere}) with the overall maximum sum found so far (${maxSoFar}). A new overall maximum sum is found.`;

      l.breakpoint(8);
      maxSoFar = maxEndingHere;

      // Log state after updating maxSoFar
      l.arrayV3(
        { nums: nums },
        { i: { value: i, label: `Current index: ${i}` } }
      );
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `maxSoFar is updated to ${maxSoFar}.`;
      l.breakpoint(9);
    } else {
      // Log state if maxSoFar is not updated
      l.arrayV3(
        { nums: nums },
        { i: { value: i, label: `Current index: ${i}` } }
      );
      // HIDE_START
      l.group("comparision", {
        startNew,
        extendSum,
        maxEndingHere,
        maxSoFar,
        num,
      });
      // HIDE_END
      l.comment = `Compare the current maximum sum ending here (${maxEndingHere}) with the overall maximum sum found so far (${maxSoFar}). The overall maximum sum remains ${maxSoFar}.`;

      l.breakpoint(10);
    }
    // End of loop iteration
  }

  // Final state log
  l.arrayV3({ nums: nums }, {});
  l.group("comparision", { maxEndingHere, maxSoFar });
  l.comment = `All numbers processed. The final maximum subarray sum is ${maxSoFar}.`;
  l.breakpoint(11);

  return l.getSteps();
}
