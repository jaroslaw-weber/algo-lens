import { ProblemState } from "algo-lens-core";
import { MissingNumberInput } from "./types";
import { StepLogger } from "../../core/StepLogger"; // Import StepLogger

/**
 * Generates the states for the missing number algorithm visualization using StepLogger.
 */
export function generateSteps(p: MissingNumberInput): ProblemState[] {
  const l = new StepLogger(); // Instantiate StepLogger
  const { nums } = p;

  let n = nums.length;
  let expectedSum = (n * (n + 1)) / 2;
  let actualSum = 0;

  // Breakpoint 1: Initial state
  l.breakpoint(1);
  l.array("nums", nums); // Log initial array
  l.group("sum", { expectedSum, actualSum }); // Log initial sums
  l.save(); // Save the state for breakpoint 1

  // Loop to calculate actual sum
  for (let i = 0; i < nums.length; i++) {
    actualSum += nums[i];

    // Breakpoint 2: Inside loop state
    l.breakpoint(2);
    l.array("nums", nums, i); // Log array, highlighting index i
    l.group("sum", { expectedSum, actualSum }); // Log current sums
    l.group("loop", { i }); // Log loop variable i
    l.save(); // Save the state for breakpoint 2
  }

  // Calculate the result
  const result = expectedSum - actualSum;

  // Breakpoint 3: Final state
  l.breakpoint(3);
  l.array("nums", nums); // Log final array state
  l.group("sum", { expectedSum, actualSum, result }); // Log final sums and result
  // Optionally log result as simple value if not included in 'sum' group
  // l.simple({ result });
  l.save(); // Save the state for breakpoint 3

  return l.getSteps(); // Return the generated steps
}
