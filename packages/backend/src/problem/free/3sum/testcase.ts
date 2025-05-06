import { ArrayVariable, ProblemState, TestCase } from "algo-lens-core";
import { ThreeSumInput } from "./types";

export const testcases: TestCase<number[], number[][]>[] = [
  {
    input: [-1, 0, 1, 2, -1, -4],
    expected: [
      [-1, -1, 2],
      [-1, 0, 1],
    ],
    isDefault: true,
  },
  {
    input: [0, 1, 1],
    expected: [],
  },
  {
    input: [0, 0, 0],
    expected: [[0, 0, 0]],
  },
  {
    input: [-2, 0, 1, 1, 2],
    expected: [
      [-2, 0, 2],
      [-2, 1, 1],
    ],
    description: "Array with multiple triplets and duplicates" // Optional description
  },
];
