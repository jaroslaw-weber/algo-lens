import type { ProductOfArrayExceptSelfInput } from './types';

export const testCases: { input: ProductOfArrayExceptSelfInput; output: number[] }[] = [
  {
    input: { nums: [1, 2, 3, 4] },
    output: [24, 12, 8, 6],
  },
  {
    input: { nums: [-1, 1, 0, -3, 3] },
    output: [0, 0, 9, 0, 0],
  },
  {
    input: { nums: [2, 3] },
    output: [3, 2],
  },
  {
    input: { nums: [5, 5, 5, 5] },
    output: [125, 125, 125, 125],
  },
];
