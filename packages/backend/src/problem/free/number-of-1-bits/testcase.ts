import { TestCase } from "algo-lens-core"; // Corrected import path

export const testcases: TestCase<number, number>[] = [
  { input: 0, expected: 0 }, // 0
  { input: 1, expected: 1 }, // 1
  { input: 2, expected: 1 }, // 10
  { input: 3, expected: 2 }, // 11
  { input: 4, expected: 1 }, // 100
  { input: 5, expected: 2 }, // 101
  { input: 6, expected: 2 }, // 110
  { input: 7, expected: 3 }, // 111
  { input: 8, expected: 1 }, // 1000
];
