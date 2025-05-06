import { ProblemState, TestCase } from "algo-lens-core";
import { TwoSumInput } from "./types";

export const testcases: TestCase<TwoSumInput, ProblemState>[] = [
  { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
  { input: [[3, 2, 4], 6], expected: [1, 2] },
   // Changed from [3, 3], 6 (len 2, duplicates) to len 6 array
   { input: [[2, 11, 7, 15, 5, 8], 13], expected: [0, 1], isDefault: true },
  { input: [[-1, 0], -1], expected: [0, 1] },
];
