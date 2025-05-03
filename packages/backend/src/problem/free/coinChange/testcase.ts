import { TestCase } from "algo-lens-core";

export const testcases: TestCase<[number[], number], number>[] = [
  { input: [[1, 2, 5], 11], expected: 3 },
  { input: [[1], 2], expected: 2 },
  { input: [[186, 419, 83, 408], 6249], expected: 20 },
  { input: [[1, 2, 5], 7], expected: 2 },
  { input: [[1, 2, 5], 6], expected: 2 },
];
