import { TestCase } from "algo-lens-core";

export const testcases: TestCase<[string, string], number>[] = [
  { input: ["horse", "ros"], expected: 3 },
  { input: ["intention", "execution"], expected: 5 },
  { input: ["", "a"], expected: 1 },
  { input: ["a", ""], expected: 1 },
  { input: ["abc", "abc"], expected: 0 },
];
