import { TestCase } from "algo-lens-core";

export const testcases: TestCase<[number[], number], number>[] = [
  { input: [[1, 2, 5], 11], expected: 3 },
  { input: [[2], 3], expected: -1 },
  { input: [[1], 0], expected: 0 },
  { input: [[1], 1], expected: 1 },
  { input: [[1], 2], expected: 2 },
  { input: [[186, 419, 83, 408], 6249], expected: 20 },
];
