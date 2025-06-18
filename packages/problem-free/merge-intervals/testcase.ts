import { ProblemState, TestCase } from "algo-lens-core/src/types";

import { MergeIntervalsInput } from "./types";

// Added second generic argument for Output type (number[][])
export const testcases: TestCase<MergeIntervalsInput, ProblemState>[] = [
  {
    name: "Basic Overlap",
    description: "Tests merging two overlapping intervals.",
    input: [
      [1, 5],
      [2, 3],
    ],
    expected: [[1, 5]],
  },
  {
    name: "Multiple Overlaps",
    description:
      "Tests merging multiple overlapping intervals that result in a single merged interval.",
    input: [
      [1, 4],
      [2, 3],
      [3, 5],
    ],
    expected: [[1, 5]],
  },
  {
    name: "Default Merge Intervals",
    description:
      "Default test case: Tests merging a set of intervals with some overlaps and some non-overlaps.",
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
    name: "No Overlaps",
    description: "Tests a scenario where no intervals overlap.",
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
