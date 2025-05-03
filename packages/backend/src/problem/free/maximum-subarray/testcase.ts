import { TestCase, ProblemState } from "algo-lens-core";
import { MaximumSubarrayInput } from "./types";

export const testcases: TestCase<MaximumSubarrayInput, ProblemState>[] = [
  {
    input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
    expected: 6,
    description: "Mixed positive and negative numbers",
  },
  {
    input: { nums: [1, 2, 3, 4] },
    expected: 10,
    description: "All positive numbers",
  },
  {
    input: { nums: [-1, -2, -3, -4] },
    expected: -1,
    description: "All negative numbers",
  },
  {
    input: { nums: [5] },
    expected: 5,
    description: "Single element array",
  },
];
