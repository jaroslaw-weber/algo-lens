import { ProblemState } from "algo-lens-core/src/types";

import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2";
import { CountBitsInput } from "./types";

export function generateSteps(n: number): ProblemState[] {
  const l = new StepLoggerV2();
  let result: number[] = new Array(n + 1).fill(0);

  // Initial state log before the loop starts
  l.arrayV3({ result: result }, []);
  l.comment = "Initialize result array.";
  l.breakpoint(1);

  //#1 Start the loop to count the number of 1 bits in each integer from 0 to n
  for (let i = 0; i <= n; i++) {
    let count = 0;
    let num = i; // Use a temporary variable for the inner loop

    l.arrayV3({ result: result }, [
      { value: i - 1, label: "previous", color: "info" },
    ]); // Highlight previous result entry if exists
    l.binary({ num }, { highlightLast: true });
    l.group("count", { count }, { min: 0, max: n }); // Max count can be n's bit length technically, but n is safe upper bound vis-wise

    l.comment = `Process number ${num}. Count is 0.`;
    l.breakpoint(2);
    let inner_num = i; // Use a separate variable for the inner loop calculation
    //#2 Calculate the number of 1 bits in the current integer
    while (inner_num > 0) {
      l.arrayV3({ result: result }, [
        { value: i - 1, label: "previous", color: "info" },
      ]);
      l.binary({ num: inner_num }, { highlightLast: true });
      l.group("count", { count }, { min: 0, max: n });
      l.comment = "Check the least significant bit.";
      l.breakpoint(3);

      //#3 Use a bitwise AND operation to check the least significant bit
      if (inner_num & 1) {
        //#4 If the least significant bit is 1, increment the count
        l.arrayV3({ result: result }, [
          { value: i - 1, label: "previous", color: "info" },
        ]);
        l.binary({ num: inner_num }, { highlightLast: true });
        l.group("count", { count }, { min: 0, max: n });
        l.comment = "LSB is 1. Increment count.";
        l.breakpoint(4);

        count++;

        //#5 Log state after incrementing count
        l.arrayV3({ result: result }, [
          { value: i - 1, label: "previous", color: "info" },
        ]);
        l.binary({ num: inner_num }, { highlightLast: true });
        l.group("count", { count }, { min: 0, max: n });
        l.comment = "Count incremented.";
        l.breakpoint(5);
      } else {
        l.arrayV3({ result: result }, [
          { value: i - 1, label: "previous", color: "info" },
        ]);
        l.binary({ num: inner_num }, { highlightLast: true });
        l.group("count", { count }, { min: 0, max: n });
        l.comment = "LSB is 0. No count increment.";
        l.breakpoint(6); // Add breakpoint for else case
      }

      //#6 Shift the number to the right to move to the next bit
      inner_num >>= 1;
      l.arrayV3({ result: result }, [
        { value: i - 1, label: "previous", color: "info" },
      ]);
      l.binary({ num: inner_num }, { highlightLast: true }); // Show shifted number
      l.group("count", { count }, { min: 0, max: n });
      l.comment = "Right-shift the number to process next bit.";
      l.breakpoint(7);
    }

    l.arrayV3({ result: result }, [
      { value: i - 1, label: "previous", color: "info" },
    ]); // Show previous state
    l.binary({ num }, { highlightLast: false }); // Show original 'i' value
    l.group("count", { count }, { min: 0, max: n });
    //#7 Store the count in the result array
    l.comment = `Counted bits for ${num}. Store count ${count}.`;
    l.breakpoint(8);

    result[i] = count;

    // Log state after storing result
    l.arrayV3({ result: result }, [
      { value: i, label: "current", color: "primary" },
    ]); // Highlight the newly added result
    l.binary({ num }, { highlightLast: false });
    l.group("count", { count }, { min: 0, max: n });
    l.comment = `Stored count ${count} for ${num}.`;
  }
  l.arrayV3({ result }, []); // Show final result array
  //#8 Log final state
  l.comment = "Finished processing all numbers. Returning result.";
  l.breakpoint(9);

  return l.getSteps();
}
