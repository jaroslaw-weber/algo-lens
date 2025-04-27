import { TestCase } from '../../problem.types';

export const threeSumTestCases: TestCase<number[], number[][]>[] = [
  {
    nums: [-1, 0, 1, 2, -1, -4],
    expected: [
      [-1, -1, 2],
      [-1, 0, 1],
    ],
  },
  {
    nums: [0, 1, 1],
    expected: [],
  },
  {
    nums: [0, 0, 0],
    expected: [[0, 0, 0]],
  },
];
