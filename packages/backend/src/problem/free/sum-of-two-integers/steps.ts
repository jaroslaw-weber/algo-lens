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
  l.comment = `Initialize the process with the two integers, a = ${a} (${a.toString(2)}) and b = ${b} (${b.toString(2)}). The goal is to calculate their sum using bitwise operations, without using the standard addition (+) and subtraction (-) operators.`;
  l.breakpoint(1);

  while (b !== 0) {
    const prevA = a;
    const prevB = b;
    carry = prevA & prevB;
    l.binaryOperation("get carry", { prevA, prevB }, "AND");
    // State after calculating carry (Breakpoint 2)
    l.binary({ a: prevA }, {}); // Show 'a' before it's updated in the next step
    l.binary({ b: prevB }, {}); // Show 'b' before it's updated
    l.binary({ carry });
    l.comment = `Calculate the 'carry' bits by performing a bitwise AND operation between the current values of a (${prevA.toString(2)}) and b (${prevB.toString(2)}). A carry is generated when both corresponding bits are 1. The result of the AND operation is ${carry.toString(2)}.`;
    l.breakpoint(2);

    a = prevA ^ prevB;
    l.binaryOperation("get sum without carry", { prevA, prevB }, "XOR"); // Add logging for XOR
    // State after calculating sum without carry (Breakpoint 3)
    l.binary({ a }); // Show new 'a'
    l.binary({ b }); // Show 'b' before it's updated

    l.binary({ carry });
    l.comment = `Calculate the sum of the bits without considering the carry by performing a bitwise XOR operation between the current values of a (${prevA.toString(2)}) and b (${prevB.toString(2)}). The XOR operation gives the sum bit when the corresponding bits are different. The result is ${a.toString(2)}.`;
    l.breakpoint(3);

    // #4 Calculate sum bits (without carry)
    l.binary({ a }); // a now holds sum without carry
    l.binary({ b });
    l.binary({ carry });
    l.breakpoint(4);

    b = carry << 1;
    //todo: l.binaryOperation("shift carry", { carry, one: 1 }, "<<"); // Add logging for left shift (using 1 as the shift amount)
    // State after shifting carry (Breakpoint 4)
    l.binary({ a }); // Show 'a' (which is sum without carry)
    l.binary({ b }); // b now holds the shifted carry
    // l.binary({ carry }); // carry here is the value *before* b = carry << 1
    l.comment = `Shift the 'carry' bits one position to the left (carry << 1). This prepares the carry to be added to the next significant bit position in the next iteration. The shifted carry value is ${b.toString(2)}. The new values for the next iteration are a = ${a.toString(2)} and b = ${b.toString(2)}.`;
    l.breakpoint(4);
  }

  // #6 Loop finished (no more carry)
  l.binary({ a }); // Final sum is in a
  l.binary({ b }); // b is 0
  if (carry !== undefined) {
    l.binary({ carry }); // carry from the last iteration (could be 0 or the last non-zero carry)
  }
  l.breakpoint(6);

  // #7 Return final sum
  const result = a; // Assign final sum in 'a' to 'result'
  l.binary({ result }); // Log the variable 'result' (which now holds the sum)
  l.binary({ b }); // b should be 0 here
  // Optionally log the final carry if it was defined in the last iteration
  // For the explanation, we'll assume carry might be relevant if b was non-zero in the last iteration
  l.comment = `The loop continues as long as there is a carry (b !== 0). When b becomes 0, it means there are no more carries to process. The final sum is stored in a = ${a} (${a.toString(2)}).`;
  if (carry !== undefined) {
    // if carry was calculated in the loop

    l.binary({ carry });
  }

  l.breakpoint(7);

  return l.getSteps();
}
