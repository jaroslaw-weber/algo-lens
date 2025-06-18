import { TestCase } from "algo-lens-core/src/types";

import { ProductExceptSelfInput } from "./types";

export const testcases = [
  {
    name: "Standard Input",
    description: "Tests a standard array of positive integers.",
    input: [1, 2, 3, 4, 5],
    expected: [120, 60, 40, 30, 24],
  },
  {
    name: "Small Input",
    description: "Tests a small array with two elements.",
    input: [1, 2],
    expected: [2, 1],
  },
  {
    // Changed from [4, 3, 2, 1] (len 4) to [1, 2, 3, 4, 5] (len 5)
    name: "Default Input",
    description:
      "Default test case: Tests a standard array of positive integers.",
    input: [1, 2, 3, 4, 5],
    expected: [120, 60, 40, 30, 24],
    isDefault: true,
  },
  {
    name: "With Zero",
    description: "Tests an array containing a zero.",
    input: [0, 1, 2, 3, 4],
    expected: [24, 0, 0, 0, 0],
  },
];
