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
  l.breakpoint(1, `Initialize \`maxEndingHere\` and \`maxSoFar\` to the first element (\`nums[0]\`) because the maximum subarray sum must include at least one element, and the first element is the starting point for considering subarrays.`);

  // Main loop (Starts from i = 1 in standard Kadane, original started from i = 0 but handled i=0 differently)
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i]; // Current number

    // Log state at the beginning of the loop (Corresponds to original log(2, i))
    l.arrayV2({ nums: nums }, { i: i }); // Highlight current number
    l.simple({ maxEndingHere });
    l.simple({ maxSoFar });
    l.simple({ num });
    l.breakpoint(2, `Process the element at index ${i} with value ${num}. This is the current element being considered to extend or start a new maximum subarray.`);

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
      l.breakpoint(3, `Start a new subarray from the current element (${num}) because its value is greater than the sum of the current element and the maximum sum ending at the previous position (${maxEndingHere} + ${num}). This means extending the previous subarray would result in a smaller sum.`);

      maxEndingHere = startNew;

      // Log state *after* updating maxEndingHere (Corresponds roughly to original log(4, i))
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ maxEndingHere }); // Updated
      l.simple({ maxSoFar });
      l.simple({ num });
      l.breakpoint(3, `Updated maxEndingHere to ${maxEndingHere}.`); // Reuse breakpoint 3 as per code.ts
    } else {
      // Log state *before* updating maxEndingHere (Corresponds roughly to original log(5, i))
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ maxEndingHere });
      l.simple({ maxSoFar });
      l.simple({ num });
      l.simple({
        comparison: `${startNew} (num) <= ${extendSum} (maxEndingHere + num)`,
      });
      l.breakpoint(3, `Extend the current subarray by adding the current element (${num}) to the maximum sum ending at the previous position (${maxEndingHere}) because extending the previous subarray results in a sum (${maxEndingHere} + ${num}) that is greater than or equal to starting a new subarray from the current element (${num}).`); // Use breakpoint 3 logic flow

      maxEndingHere = extendSum;

      // Log state *after* updating maxEndingHere (Corresponds roughly to original log(6, i))
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ maxEndingHere }); // Updated
      l.simple({ maxSoFar });
      l.simple({ num });
      l.breakpoint(3, `Updated maxEndingHere to ${maxEndingHere}.`); // Reuse breakpoint 3
    }

    // Update maxSoFar (Corresponds to original log(7, i) to log(9, i) block)
    // Log state *before* updating maxSoFar
    l.arrayV2({ nums: nums }, { i: i });
    l.simple({ maxEndingHere });
    l.simple({ maxSoFar });
    l.simple({ num });
    l.breakpoint(4, `Compare the maximum sum ending at the current position (${maxEndingHere}) with the overall maximum sum found so far (${maxSoFar}) to determine if a new overall maximum has been found.`);

    if (maxEndingHere > maxSoFar) {
      // Log state *before* updating maxSoFar (Corresponds roughly to original log(8, i))
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ maxEndingHere });
      l.simple({ maxSoFar });
      l.simple({ num });
      l.simple({ comparison: `${maxEndingHere} > ${maxSoFar}` });
      l.breakpoint(5, `Update maxSoFar to ${maxSoFar} because the maximum sum ending at the current position (${maxEndingHere}) is greater than the overall maximum sum found so far (${maxSoFar}). This means a new largest subarray sum has been found.`); // Use breakpoint 5 as per code.ts

      maxSoFar = maxEndingHere;

      // Log state *after* updating maxSoFar (Corresponds roughly to original log(9, i))
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ maxEndingHere });
      l.simple({ maxSoFar }); // Updated
      l.simple({ num });
      l.breakpoint(5, `Update maxSoFar to ${maxSoFar} because the maximum sum ending at the current position (${maxEndingHere}) is greater than the previous overall maximum sum (${maxSoFar}).`); // Reuse breakpoint 5
    } else {
      // Log state if maxSoFar is not updated
      l.arrayV2({ nums: nums }, { i: i });
      l.simple({ maxEndingHere });
      l.simple({ maxSoFar });
      l.simple({ num });
      l.simple({ comparison: `${maxEndingHere} <= ${maxSoFar}` });
      l.breakpoint(5, `maxSoFar (${maxSoFar}) remains the maximum because the maximum sum ending at the current position (${maxEndingHere}) is not greater than the overall maximum sum found so far (${maxSoFar}).`); // Reuse breakpoint 5
    }
    // End of loop iteration (Corresponds to original log(10, i))
  }

  // Final state log (Corresponds to original log(11))
  l.arrayV2({ nums: nums }, {});
  l.simple({ maxEndingHere });
  l.simple({ maxSoFar }); // Final result
  l.simple({ result: maxSoFar }); // Add this line to log 'result'
  l.breakpoint(6, `The loop has finished processing all elements. The final maximum subarray sum found is ${maxSoFar}.`); // Breakpoint 6 as per code.ts

  return l.getSteps();
}
