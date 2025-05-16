import { ProblemState } from "algo-lens-core";
import { MissingNumberInput } from "./types";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2

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
  l.arrayV2({ nums }); // Log initial array
  l.group("sum", { expectedSum, actualSum }); // Log initial sums

  l.comment = `Initialize the process by calculating the expected sum of numbers from 0 to n using the formula (n * (n + 1)) / 2. Here, n is the number of elements in the input array (${n}). The expected sum is ${expectedSum}. We also initialize actualSum to 0, which will store the sum of the numbers present in the input array.`;
  l.breakpoint(1);
  // Loop to calculate actual sum
  for (let i = 0; i < nums.length; i++) {
    const prevActualSum = actualSum;
    actualSum += nums[i];

    // Breakpoint 2: Inside loop state
    l.arrayV2({ nums }, { i }); // Log array, highlighting index i
    l.group("sum", { expectedSum, actualSum }); // Log current sums
    l.comment = `Iterate through the input array. In this step, we add the current number (${nums[i]}) to the actualSum. The actualSum was previously ${prevActualSum}, and after adding ${nums[i]}, it becomes ${actualSum}. This helps us find the sum of the numbers that are actually present in the array.`;
    l.breakpoint(2);
  }

  // Calculate the result
  const result = expectedSum - actualSum;

  // Breakpoint 3: Final state
  l.arrayV2({ nums }); // Log final array state
  l.group("sum", { expectedSum, actualSum, result }); // Log final sums and result
  // Optionally log result as simple value if not included in 'sum' group
  l.simple({ result });
  l.comment = `After summing all the numbers in the input array, calculate the missing number by subtracting the actual sum (${actualSum}) from the expected sum (${expectedSum}). The difference, ${result}, is the number that was missing from the array.`;
  l.breakpoint(3);

  return l.getSteps(); // Return the generated steps
}
