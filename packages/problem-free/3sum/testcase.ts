import {
  ArrayVariable,
  ProblemState,
  TestCase,
} from "@algolens/core/src/types";

import { ThreeSumInput } from "./types";

export const testcases: TestCase<ThreeSumInput, ProblemState>[] = [
  {
    name: "Example 1",
    description: "Basic example with a few triplets.",
    input: [-1, 0, 1, 2, -1, -4, -2, 3],
    expected: [
      [-4, 1, 3],
      [-2, -1, 3],
      [-2, 0, 2],
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  },
  {
    name: "No Triplet Found",
    description: "Input array where no triplet sums to zero.",
    input: [0, 1, 1, 5, 6, 7, 8],
    expected: [],
  },
  {
    // Original: [0, 0, 0] - Changed to a medium size input
    name: "Contains Zeroes",
    description: "Test case with all zeroes.",
    input: [0, 0, 0, 0, 0, 0, 0],
    expected: [[0, 0, 0]],
    isDefault: true,
  },
  {
    name: "With Duplicates",
    input: [-2, 0, 1, 1, 2, -1, -1, 3],
    expected: [
      [-2, -1, 3],
      [-2, 0, 2],
      [-2, 1, 1],
      [-1, -1, 2],
      [-1, 0, 1],
    ],
    description: "Array with multiple triplets and duplicates", // Optional description
  },
];
