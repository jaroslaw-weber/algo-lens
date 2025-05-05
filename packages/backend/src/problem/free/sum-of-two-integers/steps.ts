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

  // Initial state (Breakpoint 1)
  l.binary({ a });
  l.binary({ b });
  l.breakpoint(1);

  while (b !== 0) {
    carry = a & b;
    // State after calculating carry (Breakpoint 2)
    l.binary({ a });
    l.binary({ b });
    l.binary({ carry });
    l.breakpoint(2);

    a = a ^ b;
    // State after calculating sum without carry (Breakpoint 3)
    l.binary({ a });
    l.binary({ b });
    l.binary({ carry });
    l.breakpoint(3);

    b = carry << 1;
    // State after shifting carry (Breakpoint 4)
    l.binary({ a });
    l.binary({ b }); // b now holds the shifted carry
    l.binary({ carry });
    l.breakpoint(4);
  }

  // Final state (Breakpoint 5)
  l.binary({ result: a }); // Log 'a' with the label 'result'
  l.binary({ b }); // b should be 0 here
  // Optionally log the final carry if it was defined in the last iteration
  if (carry !== undefined) {
    l.binary({ carry });
  }
  l.breakpoint(5);

  return l.getSteps();
}
