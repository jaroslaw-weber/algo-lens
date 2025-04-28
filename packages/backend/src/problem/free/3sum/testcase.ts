import { ProblemState, TestCase } from "algo-lens-core";
import { ThreeSumInput } from "./types";

export const testcases: TestCase<ThreeSumInput, ProblemState>[] = [
  {
    input: { numbers: [-1, 0, 1, 2, -1, -4] },
    expected: [
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  },
  {
    input: { numbers: [0, 1, 1] },
    expected: [],
  },
  {
    input: { numbers: [0, 0, 0] },
    expected: [[0, 0, 0]],
  },
];