import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Adjusted path
import { MaximumSubarrayInput } from "./types";
import { groups } from "./groups"; // Import groups
import { sum } from "lodash"; // Import sum for potential range calculation if needed

export function generateSteps(p: MaximumSubarrayInput): ProblemState[] {
  const l = new StepLoggerV2();
  const { nums } = p;

  // Map original variable names to new ones for logging if needed, but stick to new names defined in variables.ts
  let maxEndingHere = nums[0]; // Corresponds to original maxCurrent
  let maxSoFar = nums[0];      // Corresponds to original maxGlobal

  const inputGroup = groups.find(g => g.name === "input")!.name;
  const kadaneGroup = groups.find(g => g.name === "kadane_vars")!.name;
  const loopGroup = groups.find(g => g.name === "loop")!.name;

  // Log initial state (Before loop, corresponds to original log(1))
  l.array("nums", nums, [], inputGroup);
  l.simple({ maxEndingHere }, kadaneGroup);
  l.simple({ maxSoFar }, kadaneGroup);
  l.breakpoint(1, "Initialization: maxEndingHere and maxSoFar set to the first element.");

  // Main loop (Starts from i = 1 in standard Kadane, original started from i = 0 but handled i=0 differently)
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i]; // Current number

    // Log state at the beginning of the loop (Corresponds to original log(2, i))
    l.array("nums", nums, [i], inputGroup); // Highlight current number
    l.simple({ maxEndingHere }, kadaneGroup);
    l.simple({ maxSoFar }, kadaneGroup);
    l.simple({ i }, loopGroup);
    l.simple({ num }, loopGroup);
    l.breakpoint(2, `Processing element at index ${i}: ${num}.`);

    // Kadane's logic: Decide whether to extend or start new subarray
    // (Corresponds to original logic block checking nums[i] > maxCurrent + nums[i])
    // We log *before* the update based on the comparison.
    const extendSum = maxEndingHere + num;
    const startNew = num;

    if (startNew > extendSum) {
      // Log state *before* updating maxEndingHere (Corresponds roughly to original log(3, i))
      l.array("nums", nums, [i], inputGroup);
      l.simple({ maxEndingHere }, kadaneGroup);
      l.simple({ maxSoFar }, kadaneGroup);
      l.simple({ i }, loopGroup);
      l.simple({ num }, loopGroup);
      l.simple({ comparison: `${startNew} (num) > ${extendSum} (maxEndingHere + num)` }, loopGroup);
      l.breakpoint(3, `Starting new subarray as ${num} is greater than ${maxEndingHere} + ${num}.`);

      maxEndingHere = startNew;

      // Log state *after* updating maxEndingHere (Corresponds roughly to original log(4, i))
      l.array("nums", nums, [i], inputGroup);
      l.simple({ maxEndingHere }, kadaneGroup); // Updated
      l.simple({ maxSoFar }, kadaneGroup);
      l.simple({ i }, loopGroup);
      l.simple({ num }, loopGroup);
      l.breakpoint(3, `Updated maxEndingHere to ${maxEndingHere}.`); // Reuse breakpoint 3 as per code.ts
    } else {
      // Log state *before* updating maxEndingHere (Corresponds roughly to original log(5, i))
      l.array("nums", nums, [i], inputGroup);
      l.simple({ maxEndingHere }, kadaneGroup);
      l.simple({ maxSoFar }, kadaneGroup);
      l.simple({ i }, loopGroup);
      l.simple({ num }, loopGroup);
      l.simple({ comparison: `${startNew} (num) <= ${extendSum} (maxEndingHere + num)` }, loopGroup);
      l.breakpoint(3, `Extending current subarray as ${maxEndingHere} + ${num} is greater than or equal to ${num}.`); // Use breakpoint 3 logic flow

      maxEndingHere = extendSum;

      // Log state *after* updating maxEndingHere (Corresponds roughly to original log(6, i))
      l.array("nums", nums, [i], inputGroup);
      l.simple({ maxEndingHere }, kadaneGroup); // Updated
      l.simple({ maxSoFar }, kadaneGroup);
      l.simple({ i }, loopGroup);
      l.simple({ num }, loopGroup);
      l.breakpoint(3, `Updated maxEndingHere to ${maxEndingHere}.`); // Reuse breakpoint 3
    }

    // Update maxSoFar (Corresponds to original log(7, i) to log(9, i) block)
    // Log state *before* updating maxSoFar
    l.array("nums", nums, [i], inputGroup);
    l.simple({ maxEndingHere }, kadaneGroup);
    l.simple({ maxSoFar }, kadaneGroup);
    l.simple({ i }, loopGroup);
    l.simple({ num }, loopGroup);
    l.breakpoint(4, `Comparing maxEndingHere (${maxEndingHere}) with maxSoFar (${maxSoFar}).`);

    if (maxEndingHere > maxSoFar) {
       // Log state *before* updating maxSoFar (Corresponds roughly to original log(8, i))
      l.array("nums", nums, [i], inputGroup);
      l.simple({ maxEndingHere }, kadaneGroup);
      l.simple({ maxSoFar }, kadaneGroup);
      l.simple({ i }, loopGroup);
      l.simple({ num }, loopGroup);
      l.simple({ comparison: `${maxEndingHere} > ${maxSoFar}` }, loopGroup);
      l.breakpoint(5, `maxEndingHere is greater than maxSoFar.`); // Use breakpoint 5 as per code.ts

      maxSoFar = maxEndingHere;

      // Log state *after* updating maxSoFar (Corresponds roughly to original log(9, i))
      l.array("nums", nums, [i], inputGroup);
      l.simple({ maxEndingHere }, kadaneGroup);
      l.simple({ maxSoFar }, kadaneGroup); // Updated
      l.simple({ i }, loopGroup);
      l.simple({ num }, loopGroup);
      l.breakpoint(5, `Updated maxSoFar to ${maxSoFar}.`); // Reuse breakpoint 5
    } else {
       // Log state if maxSoFar is not updated
      l.array("nums", nums, [i], inputGroup);
      l.simple({ maxEndingHere }, kadaneGroup);
      l.simple({ maxSoFar }, kadaneGroup);
      l.simple({ i }, loopGroup);
      l.simple({ num }, loopGroup);
      l.simple({ comparison: `${maxEndingHere} <= ${maxSoFar}` }, loopGroup);
      l.breakpoint(5, `maxSoFar (${maxSoFar}) remains the maximum.`); // Reuse breakpoint 5
    }
    // End of loop iteration (Corresponds to original log(10, i))
  }

  // Final state log (Corresponds to original log(11))
  l.array("nums", nums, [], inputGroup);
  l.simple({ maxEndingHere }, kadaneGroup);
  l.simple({ maxSoFar }, kadaneGroup); // Final result
  l.breakpoint(6, `Loop finished. Final maximum subarray sum is ${maxSoFar}.`); // Breakpoint 6 as per code.ts

  return l.getSteps();
}
