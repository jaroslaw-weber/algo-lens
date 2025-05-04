import { ProblemState, Variable } from "algo-lens-core"; // Import necessary types
import { asBinary, asValueGroup } from "../../core/utils";
import { HammingWeightInput } from "./types"; // Import HammingWeightInput

export function generateSteps(p: HammingWeightInput): ProblemState[] {
  const { n } = p;
  const steps: ProblemState[] = [];

  let count = 0;
  let maskingBit = 1;
  let i = 0; // Tracks bit position (0 to 31)

  // Simplified log function - no longer handles the final result step
  function log(point: number) {
    const variables: Variable[] = []; // Initialize variables array for the step

    variables.push(asValueGroup("input", { n }, { min: 0, max: n }));

    // Include maskingBit only when it's valid (non-zero)
    if (maskingBit !== 0) {
      variables.push(asBinary({ maskingBit }, {
         // Visual cue for mask position, can adjust if needed
      }));
    }

    // Always include n, showing which bit 'i' is considering
    variables.push(asBinary({ n }, {
        pointersRight: [i] // Highlight bit being checked
    }));

    // Always include the current count
    variables.push(asValueGroup("count", { count }, { min: 0, max: 32 }));

    const step: ProblemState = {
      variables: variables,
      breakpoint: point,
    };

    steps.push(step);
  }

  log(1); // Initial state

  //#2 Start the loop to count the number of 1-bits
  while (i < 32) { // Iterate 32 times for a 32-bit integer
    log(2); // State at start of loop iteration

    //#3 Check if the current bit is set using the mask
    if ((n & maskingBit) !== 0) {
      count++;
      log(3); // State after incrementing count (includes updated count)
    }

    //#4 Shift the masking bit to the left for the next position
    if (i < 31) {
        maskingBit <<= 1;
    } else {
        maskingBit = 0; // Mask becomes 0 after the last shift
    }
    i++;
    // Log state *after* potential increment and mask shift, before next iteration check
    log(4);
  }

  // Log the state *after* the loop finishes (i=32, mask=0)
  log(5);

  // #5 Manually add the final step explicitly showing the result
  const finalState: ProblemState = {
      variables: [
          asValueGroup("input", { n }, { min: 0, max: n }), // Include input for context
          asValueGroup("count", { count }, { min: 0, max: 32 }), // Final count
          asValueGroup("result", { result: count }, { min: 0, max: 32 }) // Explicit result variable
      ],
      breakpoint: 6, // Use a new breakpoint number for the dedicated result step
  };
  steps.push(finalState);


  return steps;
}
