import { TestCase } from 'algo-lens-core';

// Define test cases for Contains Duplicate (LeetCode #217)
export const testcases: TestCase<number[], boolean>[] = [
  // Existing cases
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
  },

  // Added generated cases
  {
    input: [1], // Single element array
    expected: false
  },
  {
    input: [1, 3, 5, 7, 9, 1], // Duplicate at the end
    expected: true
  },
  {
    input: [-1, -2, -3, -1], // Negative numbers with duplicate
    expected: true
  },
  {
    input: [0, 1, 2, 3, 4, 5, 0], // Duplicate zero
    expected: true
  },
  {
    input: [100, 200, 300, 400], // Larger numbers, no duplicates
    expected: false
  }
];
