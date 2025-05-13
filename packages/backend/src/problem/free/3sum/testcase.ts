import { ArrayVariable, ProblemState, TestCase } from "algo-lens-core";
import { ThreeSumInput } from "./types";

export const testcases = [
  {
    input: [-1, 0, 1, 2, -1, -4],
    expected: [
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  },
  {
    input: [0, 1, 1],
    expected: [],
  },
  {
    // Original: [0, 0, 0] - Changed to a medium size input
    input: [-1, 0, 1, 2, -1, -4, 5, -2, 3],
    expected: [
      [-4, -1, 5],
      [-4, 1, 3],
      [-2, -1, 3],
      [-2, 0, 2],
      [-1, -1, 2],
      [-1, 0, 1],
    ],
    isDefault: true,
  },
  {
    input: [-2, 0, 1, 1, 2],
    expected: [
      [-2, 0, 2],
      [-2, 1, 1],
    ],
    description: "Array with multiple triplets and duplicates", // Optional description
  },
];
