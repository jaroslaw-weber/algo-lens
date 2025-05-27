import { TestCase } from "algo-lens-core";

// Define the input interface used in problem.ts
interface SumOfTwoIntegersInput {
  a: number;
  b: number;
}

// Define the expected output type (just a number for the sum)
type SumOfTwoIntegersOutput = number;

export const testcases = [
  {
    input: { a: 1, b: 2 },
    expected: 3,
    description: "Basic positive integers sum.",
  },
  {
    input: { a: 2, b: 3 },
    expected: 5,
    description: "Another basic positive integers sum.",
  },
  {
    input: { a: 1, b: 7 },
    expected: 8,
    description: "Sum with a larger second number.",
  }, // Corrected expected value
  {
    input: { a: 9, b: 11 },
    expected: 20,
    description: "Default test case with larger numbers.", // Changed from 6, 3 and corrected expected value
    isDefault: true,
  },
  { input: { a: 0, b: 0 }, expected: 0, description: "Sum of two zeros." },
  {
    input: { a: 10, b: -5 },
    expected: 5,
    description: "Sum of a positive and a negative integer.",
  },
];
