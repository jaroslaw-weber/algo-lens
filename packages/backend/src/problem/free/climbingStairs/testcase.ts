import { TestCase } from "algo-lens-core";

// Input type is number (n stairs), output type is number (number of ways)
export const testcases = [
  { input: 1, expected: 1 },
  { input: 2, expected: 2 },
  { input: 3, expected: 3 },
  { input: 5, expected: 8 },
  { input: 8, expected: 34 },
  { input: 4, expected: 5 ,
    isDefault: true},
  { input: 6, expected: 13 },
  { input: 7, expected: 21 },
  { input: 10, expected: 89 },
  { input: 45, expected: 1836311903 }
];
