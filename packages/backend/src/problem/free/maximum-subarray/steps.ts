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
  l.breakpoint(
    1,
    "Initialization: maxEndingHere and maxSoFar set to the first element."
  );

  // Main loop (Starts from i = 1 in standard Kadane, original started from i = 0 but handled i=0 differently)
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i]; // Current number

    // Log state at the beginning of the loop (Corresponds to original log(2, i))
    l.arrayV2({ nums: nums }, { i: i }); // Highlight current number
    l.simple({ maxEndingHere });
    l.simple({ maxSoFar });
    l.simple({ num });
    l.breakpoint(2, `Processing element at index ${i}: ${num}.`);

    // Kadane's logic: Decide whether to extend or start new subarray
    // (Corresponds to original logic block checking nums[i] > maxCurrent + nums[i])
    // We log *before* the update based on the comparison.
     // Kadane's logic: Decide whether to extend or start new subarray
     // Simplified logging: Log state *after* the update for maxEndingHere
     maxEndingHere = Math.max(num, maxEndingHere + num);

     // Log state *after* updating maxEndingHere (Corresponds to #3 in code)
     l.arrayV2({ nums: nums }, { i: i });
     l.simple({ maxEndingHere }); // Updated
     l.simple({ maxSoFar });
     l.simple({ num });
     l.breakpoint(3, `Updated maxEndingHere to ${maxEndingHere}.`);

     // Log state *before* updating maxSoFar (Corresponds to #4 in code)
    l.arrayV2({ nums: nums }, { i: i });
    l.simple({ maxEndingHere });
    l.simple({ maxSoFar });
    l.simple({ num });
    l.breakpoint(
      4,
      `Comparing maxEndingHere (${maxEndingHere}) with maxSoFar (${maxSoFar}).`
    );

     // Simplified logging: Log state *after* the update for maxSoFar
     maxSoFar = Math.max(maxSoFar, maxEndingHere);

     // Log state *after* updating maxSoFar (Corresponds to #5 in code)
     l.arrayV2({ nums: nums }, { i: i });
     l.simple({ maxEndingHere });
     l.simple({ maxSoFar }); // Updated
     l.simple({ num });
     l.breakpoint(5, `Updated maxSoFar to ${maxSoFar}.`);
  }
   // End of loop iteration

  // Final state log (Corresponds to original log(11))
  l.arrayV2({ nums: nums }, {});
  l.simple({ maxEndingHere });
  l.simple({ maxSoFar }); // Final result
  l.simple({ result: maxSoFar }); // Add this line to log 'result'
  l.breakpoint(6, `Loop finished. Final maximum subarray sum is ${maxSoFar}.`); // Breakpoint 6 as per code.ts

  return l.getSteps();
}
