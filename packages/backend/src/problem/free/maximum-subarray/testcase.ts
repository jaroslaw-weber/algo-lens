import { TestCase, ProblemState } from "algo-lens-core";
import { MaximumSubarrayInput } from "./types";

export const testcases = [
  {
    input: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    expected: 6,
    description: "Mixed positive and negative numbers",
  },
  {
    input: [1, 2, 3, 4],
    expected: 10,
    description: "All positive numbers",
  },
  {
    input: [-1, -2, -3, -4],
    expected: -1,
    description: "All negative numbers",

    isDefault: true,
  },
  {
    input: [5],
    expected: 5,
    description: "Single element array",
  },
];
