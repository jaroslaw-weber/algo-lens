import { ProblemState, TestCase } from "algo-lens-core/src/types";
 // Assuming TestCase type exists and path is correct
import { EraseOverlapIntervalsInput } from "./types"; // Assuming types file exists here

export const testcases: TestCase<EraseOverlapIntervalsInput, ProblemState>[] = [
  {
    name: "Overlapping Intervals",
    description:
      "Tests a scenario with multiple overlapping intervals where one needs to be removed.",
    input: [
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 3],
    ],
    expected: 1,
  },
  {
    name: "Identical Intervals",
    description:
      "Tests a scenario with identical intervals, requiring one removal.",
    input: [
      [1, 2],
      [1, 2],
    ],
    expected: 1,
  },
  {
    name: "Multiple Overlaps",
    description:
      "Tests a scenario with multiple intervals overlapping, requiring two removals.",
    input: [
      [1, 5],
      [1, 5],
      [2, 3],
    ],
    expected: 2,
  },
  {
    name: "Default Overlap",
    description:
      "Default test case: Tests a mix of overlapping and non-overlapping intervals.",
    input: [
      [1, 5],
      [2, 3],
      [5, 7],
    ],
    expected: 1,
    isDefault: true,
  },
  {
    name: "Empty Input",
    description: "Tests the behavior with an empty input array.",
    input: [],
    expected: 0,
  },
  {
    name: "Single Interval",
    description:
      "Tests the behavior with a single interval, which should not require any removals.",
    input: [[1, 2]],
    expected: 0,
  },
  {
    name: "Negative Intervals",
    description: "Tests intervals with negative coordinates.",
    input: [
      [-3, -1],
      [-2, 0],
      [0, 2],
    ],
    expected: 1,
  },
  {
    name: "Touching Intervals",
    description:
      "Tests intervals that touch at their boundaries but do not strictly overlap.",
    input: [
      [1, 2],
      [2, 2],
      [2, 3],
    ],
    expected: 0,
  },
  {
    name: "Nested Intervals",
    description:
      "Tests intervals where one is completely nested within another.",
    input: [
      [1, 6],
      [2, 4],
      [3, 5],
    ],
    expected: 2,
  },
  {
    name: "Non-overlapping Touching",
    description:
      "Tests intervals that are non-overlapping but touch at their boundaries.",
    input: [
      [1, 3],
      [3, 5],
      [5, 7],
    ],
    expected: 0,
  },
  {
    name: "Unsorted Non-overlapping",
    description: "Tests unsorted non-overlapping intervals.",
    input: [
      [3, 4],
      [1, 2],
      [2, 3],
    ],
    expected: 0,
  },
  {
    name: "Duplicate and Non-overlapping",
    description:
      "Tests a combination of duplicate and non-overlapping intervals.",
    input: [
      [1, 3],
      [1, 3],
      [4, 5],
    ],
    expected: 1,
  },
];
