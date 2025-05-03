import { TestCase } from "algo-lens-core";

export const testcases: TestCase<number[], number>[] = [
  { input: [1, 2, 3, 1], expected: 4 },
  { input: [2, 7, 9, 3, 1], expected: 12 },
  { input: [], expected: 0 },
  { input: [2, 1, 1, 2], expected: 4 },
  { input: [2], expected: 2 },
];
