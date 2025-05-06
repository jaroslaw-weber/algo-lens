import { ProblemState, TestCase } from "algo-lens-core";
import { LISInput } from "./types";

export const testcases = [
  {
    input: [10, 9, 2, 5, 3, 7, 101, 18],
    expected: 4,
  },
  {
    input: [0, 1, 0, 3, 2, 3],
    expected: 4,
  },
  {
    input: [1, 2, 3, 4, 5],
    expected: 5,

    isDefault: true,
  },
  {
    input: [5, 4, 3, 2, 1],
    expected: 1,
  },
  {
    input: [7],
    expected: 1,
  },
];
