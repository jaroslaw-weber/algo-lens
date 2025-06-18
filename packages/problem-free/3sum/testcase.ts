import { ArrayVariable, ProblemState, TestCase } from "algo-lens-core";
import { ThreeSumInput } from "./types";

export const testcases: TestCase<ThreeSumInput, ProblemState>[] = [
  {
    name: "Example 1",
    description: "Basic example with a few triplets.",
    input: [-1, 0, 1, 2, -1, -4],
    expected: [
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  },
  {
    name: "No Triplet Found",
    description: "Input array where no triplet sums to zero.",
    input: [0, 1, 1],
    expected: [],
  },
  {
    // Original: [0, 0, 0] - Changed to a medium size input
    name: "Contains Zeroes",
    description: "Test case with all zeroes.",
    input: [0, 0, 0],
    expected: [[0, 0, 0]],
    isDefault: true,
  },
  {
    name: "With Duplicates",
    input: [-2, 0, 1, 1, 2],
    expected: [
      [-2, 0, 2],
      [-2, 1, 1],
    ],
    description: "Array with multiple triplets and duplicates", // Optional description
  },
];
