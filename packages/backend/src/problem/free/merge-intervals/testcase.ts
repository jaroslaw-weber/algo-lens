import { defineTestcase } from "@problem/types/testcase";
import { MergeIntervalsInput } from "./types"; // Assuming types.ts defines MergeIntervalsInput { intervals: number[][] }

export const testcases = [
  defineTestcase<MergeIntervalsInput, number[][]>({ // Explicitly defining output type as number[][]
    title: "Test Case 1: Standard merge",
    input: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] },
    output: [[1, 6], [8, 10], [15, 18]],
  }),
  defineTestcase<MergeIntervalsInput, number[][]>({
    title: "Test Case 2: Adjacent intervals",
    input: { intervals: [[1, 4], [4, 5]] },
    output: [[1, 5]],
  }),
  defineTestcase<MergeIntervalsInput, number[][]>({
    title: "Test Case 3: Overlapping start",
    input: { intervals: [[1, 4], [0, 4]] },
    output: [[0, 4]],
  }),
  defineTestcase<MergeIntervalsInput, number[][]>({
    title: "Test Case 4: Contained interval",
    input: { intervals: [[1, 4], [2, 3]] },
    output: [[1, 4]],
  }),
   // Adding one more case for edge scenario: Empty input
  defineTestcase<MergeIntervalsInput, number[][]>({
    title: "Test Case 5: Empty Input",
    input: { intervals: [] },
    output: [],
  }),
  // Adding case: Single interval
  defineTestcase<MergeIntervalsInput, number[][]>({
    title: "Test Case 6: Single Interval",
    input: { intervals: [[1, 5]] },
    output: [[1, 5]],
  }),
  // Adding case: Non-overlapping unsorted
   defineTestcase<MergeIntervalsInput, number[][]>({
    title: "Test Case 7: Non-overlapping Unsorted",
    input: { intervals: [[8, 10], [1, 3], [15, 18], [2, 6]] },
    // Output should be sorted by start time after merging
    output: [[1, 6], [8, 10], [15, 18]],
  }),
];
