import { TestCase } from "algo-lens-core";

// Define the Interval type
type Interval = {
  start: number;
  end: number;
};

// Input type is Interval[], output type is boolean
export const testcases: TestCase<Interval[], boolean>[] = [
  {
    name: "Example 1",
    input: [
      { start: 0, end: 30 },
      { start: 5, end: 10 },
      { start: 15, end: 20 },
    ],
    expected: false,
    description: "Overlapping intervals",
  },
  {
    name: "Example 2",
    input: [
      { start: 7, end: 10 },
      { start: 2, end: 4 },
    ],
    expected: true,
    description: "Non-overlapping intervals",
    isDefault: true,
  },
  {
    name: "Single meeting",
    input: [{ start: 1, end: 5 }],
    expected: true,
    description: "Single meeting should always be possible",
  },
  {
    name: "Multiple non-overlapping meetings",
    input: [
      { start: 1, end: 3 },
      { start: 4, end: 6 },
      { start: 7, end: 9 },
    ],
    expected: true,
    description: "Multiple non-overlapping meetings",
  },
  {
    name: "Meetings with same start time",
    input: [
      { start: 1, end: 5 },
      { start: 1, end: 10 },
    ],
    expected: false,
    description: "Meetings with same start time and overlap",
  },
];
