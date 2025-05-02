import { TestCase } from "algo-lens-core";
import { InsertIntervalInput, Interval } from "./types"; // Import InputType and Interval from types.ts

// Define the output type based on the function signature in code.ts
type InsertIntervalOutput = Interval[];

// Define the test cases for the insertInterval function
export const testcases: Array<TestCase<InsertIntervalInput, InsertIntervalOutput>> = [
  {
    input: {
      intervals: [[1, 3], [6, 9]],
      newInterval: [2, 5],
    },
    expected: [[1, 5], [6, 9]],
    description: "New interval overlaps with the first interval"
  },
  {
    input: {
      intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]],
      newInterval: [4, 8],
    },
    expected: [[1, 2], [3, 10], [12, 16]],
    description: "New interval overlaps with multiple existing intervals"
  },
  {
    input: {
      intervals: [],
      newInterval: [5, 7],
    },
    expected: [[5, 7]],
    description: "Edge case: Empty intervals list"
  },
  {
    input: {
      intervals: [[1, 5]],
      newInterval: [6, 8],
    },
    expected: [[1, 5], [6, 8]],
    description: "New interval is inserted after all existing intervals, no overlap"
  },
  {
     input: {
      intervals: [[6, 8]],
      newInterval: [1, 5],
    },
    expected: [[1, 5], [6, 8]],
    description: "New interval is inserted before all existing intervals, no overlap"
  }
];
