import { ProblemState, TestCase } from "algo-lens-core";
import { InsertIntervalInput } from "./types";
// Removed ProblemState and InsertIntervalInput imports

// Corrected TestCase signature to use tuple input and number[][] output
export const testcases: TestCase<InsertIntervalInput, ProblemState>[] = [
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
    // Changed from [[[1, 5]], [2, 3]] to a more complex case
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
