import { ProblemState, TestCase } from "algo-lens-core";
import { MergeIntervalsInput } from "./types";

// Added second generic argument for Output type (number[][])
export const testcases: TestCase<MergeIntervalsInput, ProblemState>[] = [
  {
    input: [
      [1, 5],
      [2, 3],
    ],
    expected: [[1, 5]],
  },
  {
    input: [
      [1, 4],
      [2, 3],
      [3, 5],
    ],
    expected: [[1, 5]],
  },
  {
    input: [
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ],
    expected: [
      [1, 6],
      [8, 10],
      [15, 18],
    ],

    isDefault: true,
  },
  {
    input: [
      [1, 2],
      [3, 4],
    ],
    expected: [
      [1, 2],
      [3, 4],
    ],
  },
];
