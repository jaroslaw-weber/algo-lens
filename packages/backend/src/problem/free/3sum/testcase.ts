import { ArrayVariable, ProblemState, TestCase } from "algo-lens-core";
import { ThreeSumInput } from "./types";

export const testcases: TestCase<ThreeSumInput, ProblemState>[] = [
  {
    input: { nums: [-1, 0, 1, 2, -1, -4] },
    expected: {
      variables: [
        {
          label: "result",
          type: "array",
          value: [[-1, -1, 2], [-1, 0, 1]],
          
        } as ArrayVariable
      ],
      
    },
  },
  {
    input: { nums: [0, 1, 1] },
    expected: {
      variables: [],
    },
  },
  {
    input: { nums: [0, 0, 0] },
    expected: {
      variables: [],
    },
  },
];