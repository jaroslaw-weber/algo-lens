import type { TwoSumInput } from './types';

export const testCases: { input: TwoSumInput; output: number[] }[] = [
  {
    input: { nums: [2, 7, 11, 15], target: 9 },
    output: [0, 1], // or [1, 0]
  },
  {
    input: { nums: [3, 2, 4], target: 6 },
    output: [1, 2], // or [2, 1]
  },
  {
    input: { nums: [3, 3], target: 6 },
    output: [0, 1], // or [1, 0]
  },
  {
    input: { nums: [-1, -2, -3, -4, -5], target: -8 },
    output: [2, 4], // or [4, 2]
  },
];
