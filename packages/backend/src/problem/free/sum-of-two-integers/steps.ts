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
  l.breakpoint_explanation = `Initial state: a = ${a} (${a.toString(2)}), b = ${b} (${b.toString(2)}).`;
  l.breakpoint(1);

  while (b !== 0) {
    const prevA = a;
    const prevB = b;
    carry = prevA & prevB;
    // State after calculating carry (Breakpoint 2)
    l.binary({ a: prevA }); // Show 'a' before it's updated in the next step
    l.binary({ b: prevB }); // Show 'b' before it's updated
    l.binary({ carry });
    l.breakpoint_explanation = `Calculated carry = a & b = ${prevA.toString(2)} & ${prevB.toString(2)} = ${carry.toString(2)}.`;
    l.breakpoint(2);

    a = prevA ^ prevB;
    // State after calculating sum without carry (Breakpoint 3)
    l.binary({ a }); // Show new 'a'
    l.binary({ b: prevB }); // Show 'b' before it's updated

    l.binary({ carry });
    l.breakpoint_explanation = `Calculated a = a ^ b (sum without carry) = ${prevA.toString(2)} ^ ${prevB.toString(2)} = ${a.toString(2)}.`;
    l.breakpoint(3);

    a = a ^ b;
    // #4 Calculate sum bits (without carry)
    l.binary({ a }); // a now holds sum without carry
    l.binary({ b });
    l.binary({ carry });
    l.breakpoint(4);

    b = carry << 1;
    // State after shifting carry (Breakpoint 4)
    l.binary({ a }); // Show 'a' (which is sum without carry)
    l.binary({ b }); // b now holds the shifted carry
    // l.binary({ carry }); // carry here is the value *before* b = carry << 1
    l.breakpoint_explanation = `Calculated b = carry << 1 (shifted carry) = ${carry.toString(2)} << 1 = ${b.toString(2)}. (New a: ${a.toString(2)}, New b: ${b.toString(2)})`;
    l.breakpoint(4);

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
  // Optionally log the final carry if it was defined in the last iteration
  // For the explanation, we'll assume carry might be relevant if b was non-zero in the last iteration
  l.breakpoint_explanation = `Loop finished (b is 0). Final result is a = ${a} (${a.toString(2)}).`;
  if (carry !== undefined) { // if carry was calculated in the loop

    l.binary({ carry });
  }
  l.breakpoint(7);

  return l.getSteps();
}
