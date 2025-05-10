import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
// import { asBinary } from "../../core/utils"; // Not needed if StepLoggerV2 handles {varName: value}

/**
 * Generates the states for the sum of two integers algorithm using bitwise operations.
 * @param a - The first integer.
 * @param b - The second integer.
 * @returns The states showing the steps of the computation.
 */
export function generateSteps(a: number, b: number): ProblemState[] {
  const l = new StepLoggerV2();
  let carry: number | undefined; // Define carry outside the loop

  // #1 Initialize carry
  l.binary({ a });
  l.binary({ b });
  // carry is undefined here initially, which is fine.
  // Or, we could initialize it to a specific value if the logic implies, e.g., 0
  // For this problem, undefined is representative of its state before first calculation.
  l.binary({ carry });
  l.breakpoint(1);

  while (b !== 0) {
    // #2 Start loop iteration (while carry exists)
    l.binary({ a });
    l.binary({ b });
    l.binary({ carry }); // carry from previous iteration or undefined
    l.breakpoint(2);

    carry = a & b;
    // #3 Calculate carry bits
    l.binary({ a });
    l.binary({ b });
    l.binary({ carry });
    l.breakpoint(3);

    a = a ^ b;
    // #4 Calculate sum bits (without carry)
    l.binary({ a }); // a now holds sum without carry
    l.binary({ b });
    l.binary({ carry });
    l.breakpoint(4);

    b = carry << 1;
    // #5 Shift carry left for next iteration
    l.binary({ a });
    l.binary({ b }); // b now holds the shifted carry
    l.binary({ carry }); // carry still holds the value before shifting for this step's log
    l.breakpoint(5);
  }

  // #6 Loop finished (no more carry)
  l.binary({ a }); // Final sum is in a
  l.binary({ b }); // b is 0
  l.binary({ carry }); // carry from the last iteration (could be 0 or the last non-zero carry)
  l.breakpoint(6);

  // #7 Return final sum
  const result = a; // Assign final sum in 'a' to 'result'
  l.binary({ result }); // Log the variable 'result' (which now holds the sum)
  l.binary({ b }); // b should be 0 here
  if (carry !== undefined) { // carry here refers to the state after loop
    l.binary({ carry });
  }
  l.breakpoint(7);

  return l.getSteps();
}
