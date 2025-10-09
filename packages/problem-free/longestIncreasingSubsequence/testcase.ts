import { ProblemState, TestCase } from "@algolens/core/src/types";

import { LISInput } from "./types";

export const testcases = [
  {
    name: "Standard Input",
    description: "A typical input array with an increasing subsequence.",
    input: [10, 9, 2, 5, 3, 7, 101, 18],
    expected: 4,
  },
  {
    name: "With Zeros",
    description: "Input array containing zeros.",
    input: [0, 1, 0, 3, 2, 3],
    expected: 4,
  },
  {
    name: "Default Input",
    description: "Default test case for initial display.",
    // Changed from [1, 2, 3, 4, 5] (edge case) to a more general case
    input: [10, 9, 2, 5, 3, 7, 101, 18],
    expected: 4,
    isDefault: true,
  },
  {
    name: "Decreasing Sequence",
    description: "Input array with a strictly decreasing sequence.",
    input: [5, 4, 3, 2, 1],
    expected: 1,
  },
  {
    name: "Single Element",
    description: "Input array with a single element.",
    input: [7],
    expected: 1,
  },
];
