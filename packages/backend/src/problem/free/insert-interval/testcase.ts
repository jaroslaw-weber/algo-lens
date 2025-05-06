import { TestCase } from "algo-lens-core";
import { InsertIntervalInput } from "./types";
// Removed ProblemState and InsertIntervalInput imports

// Corrected TestCase signature to use tuple input and number[][] output
export const testcases = [
  {
    input: [
      [
        [1, 3],
        [6, 9],
      ],
      [2, 5],
    ], // intervals, newInterval
    expected: [
      [1, 5],
      [6, 9],
    ],
  },
  {
    input: [
      [
        [1, 2],
        [3, 5],
        [6, 7],
        [8, 10],
        [12, 16],
      ],
      [4, 8],
    ],
    expected: [
      [1, 2],
      [3, 10],
      [12, 16],
    ],
  },
  {
    input: [[], [5, 7]],
    expected: [[5, 7]],
  },
  {
    input: [[[1, 5]], [2, 3]],
    expected: [[1, 5]],

    isDefault: true,
  },
  {
    input: [[[1, 5]], [6, 8]],
    expected: [
      [1, 5],
      [6, 8],
    ],
  },
  {
    input: [[[6, 8]], [1, 5]],
    expected: [
      [1, 5],
      [6, 8],
    ],
  },
  {
    input: [
      [
        [1, 5],
        [7, 9],
      ],
      [5, 7],
    ],
    expected: [[1, 9]],
  },
];
