import { TestCase } from "algo-lens-core";
import { MergeIntervalsInput } from "./types";

export const testcases: TestCase<MergeIntervalsInput>[] = [
  {
    input: { intervals: [] },
    expected: { intervals: [] },
  },
  {
    input: { intervals: [[1, 5], [2, 3]] },
    expected: { intervals: [[1, 5]] },
  },
  {
    input: { intervals: [[1, 3], [2, 6], [8, 10], [15, 18]] },
    expected: { intervals: [[1, 6], [8, 10], [15, 18]] },
  },
  {
    input: { intervals: [[1, 2], [3, 4], [5, 6]] },
    expected: { intervals: [[1, 2], [3, 4], [5, 6]] },
  },
];
