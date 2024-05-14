
import { Problem, ProblemState } from "../types";
import { asBinary } from "../utils";

interface HammingWeightInput {
  n: number;
}

export function hammingWeight(p: HammingWeightInput): ProblemState[] {
  const { n } = p;
  const steps: ProblemState[] = [];

  function logStep(point: number, count?: number) {
    const step: ProblemState = {
      variables: [asBinary({n})],
      breakpoint: point,
    };
    if (count !== undefined) {
      step.variables.push(asBinary({count}));
    }
    steps.push(step);
  }

  logStep(1);

  let count = 0;
  let maskingBit = 1;

  //#2 Start the loop to count the number of 1-bits
  while (maskingBit <= n) {
    logStep(2);

    //#3 Check if the least significant bit is 1
    if (n & maskingBit) {
      count++;
      logStep(3, count);
    }

    //#4 Shift the masking bit to the right
    maskingBit <<= 1;
  }

  logStep(4, count);

  //#5 Return the count of 1-bits
  return steps;
}

const code = `function hammingWeight(n: number): number {
  let count = 0;

  //#2 Start the loop to count the number of 1-bits
  for (let maskingBit = 1; maskingBit <= n; maskingBit <<= 1) {
    //#3 Check if the least significant bit is 1
    if (n & maskingBit) {
      //#4 Increment the count
      count++;
    }
  }

  //#5 Return the count of 1-bits
  return count;
}`;

const title = "Hamming Weight";
const getInput = () => ({ n: 9 });

export const hammingWeightProblem: Problem<HammingWeightInput, ProblemState> = {
  title,
  code,
  getInput,
  func: hammingWeight,
  id: "hamming-weight",
};
