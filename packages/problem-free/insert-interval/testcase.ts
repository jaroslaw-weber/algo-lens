import { ProblemState, TestCase } from "@algolens/core/src/types";

import { InsertIntervalInput } from "./types";
// Removed ProblemState and InsertIntervalInput imports

// Corrected TestCase signature to use tuple input and number[][] output
export const testcases: TestCase<InsertIntervalInput, ProblemState>[] = [
  {
    name: "Overlap with one interval",
    description: "New interval overlaps with one existing interval.",
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
    name: "Overlap with multiple intervals",
    description: "New interval overlaps with multiple existing intervals.",
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
    name: "Insert into empty intervals",
    description: "Insert a new interval into an empty list of intervals.",
    input: [[], [5, 7]],
    expected: [[5, 7]],
  },
  {
    name: "Default: Overlap multiple",
    description:
      "Default test case: new interval overlaps with multiple existing intervals.",
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
    name: "No overlap, insert after",
    description:
      "New interval does not overlap and is inserted after existing intervals.",
    input: [[[1, 5]], [6, 8]],
    expected: [
      [1, 5],
      [6, 8],
    ],
  },
  {
    name: "No overlap, insert before",
    description:
      "New interval does not overlap and is inserted before existing intervals.",
    input: [[[6, 8]], [1, 5]],
    expected: [
      [1, 5],
      [6, 8],
    ],
  },
  {
    name: "Merge touching intervals",
    description: "New interval merges two touching intervals.",
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
