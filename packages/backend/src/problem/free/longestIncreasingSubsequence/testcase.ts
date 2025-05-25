import { ProblemState, TestCase } from "algo-lens-core";
import { LISInput } from "./types";

export const testcases = [
  {
    name: "Standard Input",
    input: [10, 9, 2, 5, 3, 7, 101, 18],
    expected: 4,
  },
  {
    name: "With Zeros",
    input: [0, 1, 0, 3, 2, 3],
    expected: 4,
  },
  {
    // Changed from [1, 2, 3, 4, 5] (edge case) to a more general case
    name: "Default Input",
    input: [10, 9, 2, 5, 3, 7, 101, 18],
    expected: 4,
    isDefault: true,
  },
  {
    name: "Decreasing Sequence",
    input: [5, 4, 3, 2, 1],
    expected: 1,
  },
  {
    name: "Single Element",
    input: [7],
    expected: 1,
  },
];
