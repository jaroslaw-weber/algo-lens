import { ProblemState, Variable } from "algo-lens-core";
import { SumOfTwoIntegersInput } from "./types";
import { asBinary } from "./variables"; // Import the helper function

/**
 * Implements the sum of two integers algorithm using bitwise operations.
 * Generates steps for visualization.
 * @param p - The input parameters including two integers.
 * @returns The states showing the steps of the computation.
 */
export function sumOfTwoIntegersSteps(p: SumOfTwoIntegersInput): ProblemState[] {
  const steps: ProblemState[] = [];
  let { a, b } = p;
  let carry: number | undefined = undefined; // Initialize carry as potentially undefined for the first log

  // Helper function to log state
  function log(point: number) {
    const variables: Variable[] = [
      asBinary({ a }), // Use the helper, maybe add options later if needed
      asBinary({ b }),
    ];
    // Only add carry variable if it has been calculated
    if (carry !== undefined) {
      variables.push(asBinary({ carry }));
    }
    steps.push({ variables, breakpoint: point });
  }

  log(1); // #1 Initial state (a, b)

  while (b !== 0) {
    carry = a & b;
    log(2); // #2 State after calculating carry (a, b, carry)
    
    a = a ^ b;
    log(3); // #3 State after calculating sum without carry (new_a, old_b, carry)
    
    b = carry << 1;
    // Log state after updating b (new_a, new_b, carry).
    // If b becomes 0 here, this is the state before the final log.
    log(4); // #4 State after shifting carry into b
  }

  // 'a' now holds the final sum
  log(5); // #5 Final state (final_a, b=0, last_carry)

  return steps;
}
