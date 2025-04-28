import { TestCase } from "algo-lens-core";


export const testcases: TestCase<number[], number[][]>[] = [
  {
    input: [-1, 0, 1, 2, -1, -4],
    expected: [
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  },
  {
    input: [0, 1, 1],
    expected: [],
  },
  {
    input: [0, 0, 0],
    expected: [[0, 0, 0]],
  },
];
