import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { CountBitsInput } from "./types";

export function generateSteps(n: number): ProblemState[] {
  const l = new StepLoggerV2();
  let result: number[] = new Array(n + 1).fill(0);

  // Initial state log before the loop starts
  l.arrayV2({ result: result }, {});
  l.breakpoint(1, "Initialize result array.");

  //#1 Start the loop to count the number of 1 bits in each integer from 0 to n
  for (let i = 0; i <= n; i++) {
    let count = 0;
    let num = i; // Use a temporary variable for the inner loop

    l.arrayV2({ result: result }, { "i - 1": i - 1 }); // Highlight previous result entry if exists
    l.binary({ num }, { highlightLast: true });
    l.group("count", { count }, { min: 0, max: n }); // Max count can be n's bit length technically, but n is safe upper bound vis-wise

    l.breakpoint(2, `Start processing number ${i}. Initialize count to 0.`);
    let inner_num = i; // Use a separate variable for the inner loop calculation
    //#2 Calculate the number of 1 bits in the current integer
    while (inner_num > 0) {
      l.arrayV2({ result: result }, { "i - 1": i - 1 });
      l.binary({ num: inner_num }, { highlightLast: true });
      l.group("count", { count }, { min: 0, max: n });
      l.breakpoint(3, "Check the least significant bit.");

      //#3 Use a bitwise AND operation to check the least significant bit
      if (inner_num & 1) {
        //#4 If the least significant bit is 1, increment the count
        l.arrayV2({ result: result }, { "i - 1": i - 1 });
        l.binary({ num: inner_num }, { highlightLast: true });
        l.group("count", { count }, { min: 0, max: n });
        l.breakpoint(4, "LSB is 1. Increment count.");

        count++;

        //#5 Log state after incrementing count
        l.arrayV2({ result: result }, { "i - 1": i - 1 });
        l.binary({ num: inner_num }, { highlightLast: true });
        l.group("count", { count }, { min: 0, max: n });
        l.breakpoint(5, "Count incremented.");
      } else {
        l.arrayV2({ result: result }, { "i - 1": i - 1 });
        l.binary({ num: inner_num }, { highlightLast: true });
        l.group("count", { count }, { min: 0, max: n });
        l.breakpoint(4, "LSB is 0. No count increment."); // Add breakpoint for else case

        l.arrayV2({ result: result }, { "i - 1": i - 1 });
        l.binary({ num: inner_num }, { highlightLast: true });
        l.group("count", { count }, { min: 0, max: n });
        l.breakpoint(5, "Skipping count increment."); // Add breakpoint for else case
      }

      //#6 Shift the number to the right to move to the next bit
      inner_num >>= 1;
      l.arrayV2({ result: result }, { "i - 1": i - 1 });
      l.binary({ num: inner_num }, { highlightLast: true }); // Show shifted number
      l.group("count", { count }, { min: 0, max: n });
      l.breakpoint(6, "Right-shift the number to process next bit.");
    }

    l.arrayV2({ result: result }, { "i - 1": i - 1 }); // Show previous state
    l.binary({ num }, { highlightLast: false }); // Show original 'i' value
    l.group("count", { count }, { min: 0, max: n });
    //#7 Store the count in the result array
    l.breakpoint(
      7,
      `Finished counting bits for ${i}. Storing count ${count} in result[${i}].`
    );

    result[i] = count;

    // Log state after storing result
    l.arrayV2({ result: result }, { i: i }); // Highlight the newly added result
    l.binary({ num }, { highlightLast: false });
    l.group("count", { count }, { min: 0, max: n });
    l.breakpoint(7, `Stored count ${count} in result[${i}].`); // Re-use breakpoint 7 or use a new one if needed
  }
  l.simple({ result }); // Show final result array
  //#8 Log final state
  l.breakpoint(8, "Finished processing all numbers. Returning result.");

  return l.getSteps();
}
