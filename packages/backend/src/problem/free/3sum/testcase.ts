import { ThreeSumInput } from "./types";

export interface ThreeSumTestCase {
  input: ThreeSumInput;
  expectedOutput: number[][];
}

export const testCases: ThreeSumTestCase[] = [
  {
    input: { nums: [-1, 0, 1, 2, -1, -4, 4, 3, -3, 0] },
    expectedOutput: [
      [-4, 0, 4],
      [-4, 1, 3],
      [-3, 0, 3],
      [-3, 1, 2],
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  },
  {
    input: { nums: [0, 0, 0] },
    expectedOutput: [[0, 0, 0]],
  },
  {
    input: { nums: [1, 2, 3] },
    expectedOutput: [],
  },
  {
    input: { nums: [-1, 0, 1, 0] },
    expectedOutput: [[-1, 0, 1]],
  },
];
