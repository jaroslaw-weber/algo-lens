import { TestCase } from 'algo-lens-core';

// Define a few basic test cases
export const testcases: TestCase<number[], boolean>[] = [
  {
    input: [1, 2, 3, 1], // Contains duplicate
    expected: true
  },
  {
    input: [1, 2, 3, 4], // No duplicates
    expected: false
  },
  {
    input: [], // Empty array
    expected: false
  },
  {
    input: [1, 1, 1, 1], // All duplicates
    expected: true
  }
];
