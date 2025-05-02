import { TestCase } from "algo-lens-core";

// Define the input type based on the function signature in code.ts
interface SumOfTwoIntegersInput {
  a: number;
  b: number;
}

// Define the output type based on the expected return value of the core logic
type SumOfTwoIntegersOutput = number;

// Define the test cases for the sumOfTwoIntegers function
export const testcases: Array<TestCase<SumOfTwoIntegersInput, SumOfTwoIntegersOutput>> = [
  {
    input: {
      a: 1,
      b: 2,
    },
    expected: 3,
    description: "Simple case with positive integers"
  },
  {
    input: {
      a: 2,
      b: 3,
    },
    expected: 5,
    description: "Another simple case with positive integers"
  },
  {
    input: {
      a: -2,
      b: 3,
    },
    expected: 1,
    description: "Case with one negative integer"
  },
   {
    input: {
      a: -1,
      b: -5,
    },
    expected: -6,
    description: "Case with two negative integers"
  },
  {
    input: {
      a: 0,
      b: 5,
    },
    expected: 5,
    description: "Case with zero"
  },
  {
    input: {
        a: 0,
        b: 0,
    },
    expected: 0,
    description: "Case with two zeros"
  }
];
