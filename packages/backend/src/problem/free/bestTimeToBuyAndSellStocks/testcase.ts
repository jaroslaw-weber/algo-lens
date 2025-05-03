import { ProblemState, TestCase } from "algo-lens-core";
import { MaxProfitInput } from "./types"; // Assuming MaxProfitInput is defined in types.ts

export const testcases: TestCase<MaxProfitInput, number>[] = [
  { input: [2, 1, 2, 0, 1, 2], expected: 2 },
  {
    input: [7, 1, 5, 3, 6, 4],
    expected: 5,
  },
  {
    input: [7, 6, 4, 3, 1],
    expected: 0,
  },
  {
    input: [1, 2, 3, 4, 5],
    expected: 4,
  },
  {
    input: [1],
    expected: 0,
  },
];
