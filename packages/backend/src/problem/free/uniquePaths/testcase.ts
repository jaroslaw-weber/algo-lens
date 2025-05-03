import type { UniquePathsInput } from './types';

export const testCases: { input: UniquePathsInput; output: number }[] = [
  // Example 1 from LeetCode
  {
    input: { m: 3, n: 7 },
    output: 28,
  },
  // Example 2 from LeetCode
  {
    input: { m: 3, n: 2 },
    output: 3,
  },
  // Square grid
  {
    input: { m: 3, n: 3 },
    output: 6,
  },
  // Larger grid
  {
    input: { m: 7, n: 3 },
    output: 28,
  },
  // Minimal grid (1x1)
  {
    input: { m: 1, n: 1 },
    output: 1,
  },
  // Single row
  {
    input: { m: 1, n: 5 },
    output: 1,
  },
  // Single column
  {
    input: { m: 5, n: 1 },
    output: 1,
  },
];
