import { ProblemState } from "algo-lens-core/src/types";

import { MissingNumberInput } from "./types";
import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2"; // Import StepLoggerV2

/**
 * Generates the states for the missing number algorithm visualization using StepLoggerV2.
 */
export function generateSteps(nums: number[]): ProblemState[] {
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  l.groupOptions.set("sum", { min: 0, max: expectedSum, reverse: false });
  l.groupOptions.set("loop", { min: 0, max: n });
  let actualSum = 0;

  // Breakpoint 1: Initial state
  l.arrayV3({ nums }, []); // Log initial array
  l.group("sum", { expectedSum, actualSum }); // Log initial sums

  l.comment = `Calculate expected sum. Initialize actualSum.`;
  l.breakpoint(1);
  // Loop to calculate actual sum
  for (let i = 0; i < nums.length; i++) {
    const prevActualSum = actualSum;
    actualSum += nums[i];

    // Breakpoint 2: Inside loop state
    l.arrayV3({ nums }, [
      { dimension: "column", value: i, label: "current", color: "primary" },
    ]); // Log array, highlighting index i
    l.group("sum", { expectedSum, actualSum }); // Log current sums
    l.comment = `Iterate array. Add current number to actualSum.`;
    l.breakpoint(2);
  }

  // Calculate the result
  const result = expectedSum - actualSum;

  // Breakpoint 3: Final state
  l.arrayV3({ nums }, []); // Log final array state
  l.group("sum", { expectedSum, actualSum, result }); // Log final sums and result
  // Optionally log result as simple value if not included in 'sum' group
  l.simple({ result });
  l.comment = `Calculate missing number: expectedSum - actualSum.`;
  l.breakpoint(3);

  return l.getSteps(); // Return the generated steps
}
