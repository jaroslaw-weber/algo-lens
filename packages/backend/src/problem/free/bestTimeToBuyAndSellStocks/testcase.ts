import { ProblemState, TestCase } from "algo-lens-core";
import { MaxProfitInput } from "./types"; // Assuming MaxProfitInput is defined in types.ts

export const testcases = [
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
  {
    input: [2, 4, 1],
    expected: 2,
  ,
    isDefault: true},
  {
    input: [3, 2, 6, 5, 0, 3],
    expected: 4,
  },
  {
    input: [1, 1, 1, 1],
    expected: 0,
  },
  {
    input: [5, 4, 3, 2, 1],
    expected: 0,
  },
  {
    input: [2, 7, 1, 8, 2, 8],
    expected: 7,
  }
];
