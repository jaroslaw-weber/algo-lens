import { TestCase } from "algo-lens-core"; // Corrected import path

export const testcases: TestCase<number, number>[] = [
  { input: 0, expected: 0 },
  { input: 1, expected: 1 },
  { input: 2, expected: 2 },
  { input: 3, expected: 6 },
  { input: 4, expected: 24 },
  { input: 5, expected: 120 },
  { input: 6, expected: 720 },
  { input: 7, expected: 5040 },
  { input: 8, expected: 40320 },
];
