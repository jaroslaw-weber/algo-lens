import { TestCase } from "algo-lens-core";

// Define the input interface used in problem.ts
interface SumOfTwoIntegersInput {
  a: number;
  b: number;
}

// Define the expected output type (just a number for the sum)
type SumOfTwoIntegersOutput = number;

export const testcases = [
  { input: { a: 1, b: 2 }, expected: 3 },
  { input: { a: 2, b: 3 }, expected: 5 },
  { input: { a: 1, b: 7 }, expected: 0 },
  { input: { a: 6, b: 3 }, expected: 0 ,
    isDefault: true},
  { input: { a: 0, b: 0 }, expected: 0 },
  { input: { a: 10, b: -5 }, expected: 5 }
];
