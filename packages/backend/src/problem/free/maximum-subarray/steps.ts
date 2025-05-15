import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Adjusted path
import { MaximumSubarrayInput } from "./types";
import { groups } from "./groups"; // Import groups
import { sum } from "lodash"; // Import sum for potential range calculation if needed

export function generateSteps(nums: number[]): ProblemState[] {
  const l = new StepLoggerV2();

  // Map original variable names to new ones for logging if needed, but stick to new names defined in variables.ts
  let maxEndingHere = nums[0]; // Corresponds to original maxCurrent
  let maxSoFar = nums[0]; // Corresponds to original maxGlobal

  // Log initial state (Before loop, corresponds to original log(1))
  l.arrayV2({ nums: nums }, {});
  l.simple({ maxEndingHere });
  l.simple({ maxSoFar });
  l.breakpoint(1);
  l.comment = `Start with maxEndingHere and maxSoFar equal to the first number.`;

  // Main loop (Starts from i = 1 in standard Kadane, original started from i = 0 but handled i=0 differently)
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i]; // Current number

    // Log state at the beginning of the loop (Corresponds to original log(2, i))
    l.arrayV2({ nums: nums }, { i: i }); // Highlight current number
    l.simple({ maxEndingHere });
    l.simple({ maxSoFar });
    l.simple({ num });
    l.breakpoint(2);
    l.comment = `Look at the current number, which is ${num}.`;

    // Kadane's logic: Decide whether to extend or start new subarray
    // (Corresponds to original logic block checking nums[i] > maxCurrent + nums[i])
    // We log *before* the update based on the comparison.
    const extendSum = maxEndingHere + num;
    const startNew = num;

    if (startNew > extendSum) {
      // Log state *before* updating maxEndingHere (Corresponds roughly to original log(3, i))
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ maxEndingHere });
      l.simple({ maxSoFar });
      l.simple({ num });
      l.simple({
        comparison: `${startNew} (num) > ${extendSum} (maxEndingHere + num)`,
      });
      l.breakpoint(3);
      l.comment = `Starting a new subarray with ${num} is better than extending the previous one.`;

      maxEndingHere = startNew;

      // Log state *after* updating maxEndingHere (Corresponds roughly to original log(4, i))
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ maxEndingHere }); // Updated
      l.simple({ maxSoFar });
      l.simple({ num });
      l.breakpoint(4);
      l.comment = `maxEndingHere is now ${maxEndingHere}.`;
    } else {
      // Log state *before* updating maxEndingHere (Corresponds roughly to original log(5, i))
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ maxEndingHere });
      l.simple({ maxSoFar });
      l.simple({ num });
      l.simple({
        comparison: `${startNew} (num) <= ${extendSum} (maxEndingHere + num)`,
      });
      l.breakpoint(5);
      l.comment = `Extending the previous subarray with ${num} is better or equal to starting a new one.`;

      maxEndingHere = extendSum;

      // Log state *after* updating maxEndingHere (Corresponds roughly to original log(6, i))
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ maxEndingHere }); // Updated
      l.simple({ maxSoFar });
      l.simple({ num });
      l.breakpoint(6);
      l.comment = `maxEndingHere is now ${maxEndingHere}.`;
    }

    // Update maxSoFar (Corresponds to original log(7, i) to log(9, i) block)
    // Log state *before* updating maxSoFar
    l.arrayV2({ nums: nums }, { i: i });
    l.simple({ maxEndingHere });
    l.simple({ maxSoFar });
    l.simple({ num });
    l.breakpoint(7);
    l.comment = `Check if the current maximum sum ending here (${maxEndingHere}) is greater than the overall maximum sum found so far (${maxSoFar}).`;

    if (maxEndingHere > maxSoFar) {
      // Log state *before* updating maxSoFar (Corresponds roughly to original log(8, i))
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ maxEndingHere });
      l.simple({ maxSoFar });
      l.simple({ num });
      l.simple({ comparison: `${maxEndingHere} > ${maxSoFar}` });
      l.breakpoint(8);
      l.comment = `A new overall maximum sum is found. Update maxSoFar to ${maxEndingHere}.`;

      maxSoFar = maxEndingHere;

      // Log state *after* updating maxSoFar (Corresponds roughly to original log(9, i))
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ maxEndingHere });
      l.simple({ maxSoFar }); // Updated
      l.simple({ num });
      l.breakpoint(9);
      l.comment = `maxSoFar is updated to ${maxSoFar}.`;
    } else {
      // Log state if maxSoFar is not updated
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ maxEndingHere });
      l.simple({ maxSoFar });
      l.simple({ num });
      l.simple({ comparison: `${maxEndingHere} <= ${maxSoFar}` });
      l.breakpoint(10);
      l.comment = `maxSoFar (${maxSoFar}) is still the largest sum found so far.`;
    }
    // End of loop iteration (Corresponds to original log(10, i))
  }

  // Final state log (Corresponds to original log(11))
  l.arrayV2({ nums: nums }, {});
  l.simple({ maxEndingHere });
  l.simple({ maxSoFar }); // Final result
  l.simple({ result: maxSoFar }); // Add this line to log 'result'
  l.breakpoint(11);
  l.comment = `All numbers processed. The final maximum subarray sum is ${maxSoFar}.`;

  return l.getSteps();
}
