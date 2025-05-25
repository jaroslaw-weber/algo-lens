import { ProblemState, TestCase } from "algo-lens-core"; // Assuming TestCase type exists and path is correct
import { EraseOverlapIntervalsInput } from "./types"; // Assuming types file exists here

export const testcases: TestCase<EraseOverlapIntervalsInput, ProblemState>[] = [
  {
    name: "Overlapping Intervals",
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
    input: [
      [1, 2],
      [1, 2],
    ],

    expected: 1,
  },
  {
    name: "Multiple Overlaps",
    input: [
      [1, 5],
      [1, 5],
      [2, 3],
    ],

    expected: 2,
  },
  {
    name: "Default Overlap",
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
    input: [],
    expected: 0,
  },
  {
    name: "Single Interval",
    input: [[1, 2]],
    expected: 0,
  },
  {
    name: "Negative Intervals",
    input: [
      [-3, -1],
      [-2, 0],
      [0, 2],
    ],
    expected: 1,
  },
  {
    name: "Touching Intervals",
    input: [
      [1, 2],
      [2, 2],
      [2, 3],
    ],
    expected: 0,
  },
  {
    name: "Nested Intervals",
    input: [
      [1, 6],
      [2, 4],
      [3, 5],
    ],
    expected: 2,
  },
  {
    name: "Non-overlapping Touching",
    input: [
      [1, 3],
      [3, 5],
      [5, 7],
    ],
    expected: 0,
  },
  {
    name: "Unsorted Non-overlapping",
    input: [
      [3, 4],
      [1, 2],
      [2, 3],
    ],
    expected: 0,
  },
  {
    name: "Duplicate and Non-overlapping",
    input: [
      [1, 3],
      [1, 3],
      [4, 5],
    ],
    expected: 1,
  },
];
