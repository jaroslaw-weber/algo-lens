import { TestCase } from "algo-lens-core";

// Input type is number[] (heights), output type is number (max area)
export const testcases: TestCase<number[], number>[] = [
  // Added generated cases based on LeetCode examples and edge cases
  { input: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49 },
  { input: [1, 1], expected: 1 },
  { input: [4, 3, 2, 1, 4], expected: 16 },
  { input: [1, 2, 1], expected: 2 },
  { input: [2, 3, 4, 5, 18, 17, 6], expected: 17 },
];