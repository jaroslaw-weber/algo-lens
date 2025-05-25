import { ProblemState, TestCase } from "algo-lens-core";
import { TwoSumInput } from "./types";

export const testcases: TestCase<TwoSumInput, ProblemState>[] = [
  {
    name: "Basic case with target 9",
    input: [[2, 7, 11, 15], 9],
    expected: [0, 1],
  },
  {
    name: "Target in middle of array",
    input: [[3, 2, 4], 6],
    expected: [1, 2],
  },
  // Changed from [3, 3], 6 (len 2, duplicates) to len 6 array
  {
    name: "Larger array with target 13",
    input: [[2, 7, 15, 11, 5, 8], 13],
    expected: [0, 3],
    isDefault: true,
  },
  {
    name: "Negative numbers with target -1",
    input: [[-1, 0], -1],
    expected: [0, 1],
  },
];
