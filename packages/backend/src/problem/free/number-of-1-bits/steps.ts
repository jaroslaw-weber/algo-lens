import { ProblemState } from "algo-lens-core"; // Removed Problem
import { asBinary, asValueGroup } from "../core/utils";
import { HammingWeightInput } from "./types"; // Import HammingWeightInput

export function generateSteps(p: HammingWeightInput): ProblemState[] { // Renamed and Exported
  const { n } = p;
  const steps: ProblemState[] = [];

  let count = 0;
  let maskingBit = 1;
  let i = 0;

  function log(point: number) {
    const step: ProblemState = {
      variables: [asValueGroup("input", { n }, { min: 0, max: n })],
      breakpoint: point,
    };
    if (maskingBit !== undefined) {
      step.variables.push(asBinary({ maskingBit }, {
        pointersLeft:[0]

      }));
    }
    if (n !== undefined) {
      step.variables.push(asBinary({ n }, {
        pointersRight: [i]
      }));
    }
    if (count !== undefined) {
      step.variables.push(asValueGroup("count", { count }, { min: 0, max: n }));
    }
    steps.push(step);
  }

  log(1);

  //#2 Start the loop to count the number of 1-bits
  while (maskingBit <= n) {
    log(2);

    //#3 Check if the least significant bit is 1
    if (n & maskingBit) {
      count++;
      log(3);
    }

    //#4 Shift the masking bit to the right
    maskingBit <<= 1;
    i++;
    log(4);
  }

  log(5);

  //#5 Return the count of 1-bits
  return steps;
}

// Removed HammingWeightInput interface, code, title, getInput, Problem export
