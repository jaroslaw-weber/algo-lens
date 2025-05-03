import { ProblemState, TestCase } from "algo-lens-core";
import { TwoSumInput } from "./types";

export const testcases: TestCase<TwoSumInput, ProblemState>[] = [
  { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
  { input: [[3, 2, 4], 6], expected: [1, 2] },
  { input: [[3, 3], 6], expected: [0, 1] },
  { input: [[-1, 0], -1], expected: [0, 1] },
  { input: [[-2, 0, 1, 3], 0], expected: [0, 3] },
];
