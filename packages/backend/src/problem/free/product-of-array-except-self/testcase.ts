import { TestCase } from "algo-lens-core";

// Define the input type based on the function signature in code.ts
interface ProductExceptSelfInput {
  nums: number[];
}

// Define the output type based on the expected return value of the core logic
type ProductExceptSelfOutput = number[];

// Define the test cases for the productExceptSelf function
export const testcases: Array<TestCase<ProductExceptSelfInput, ProductExceptSelfOutput>> = [
  {
    input: {
      nums: [1, 2, 3, 4],
    },
    expected: [24, 12, 8, 6],
    description: "Standard case with positive integers"
  },
  {
    input: {
      nums: [-1, 1, 0, -3, 3],
    },
    expected: [0, 0, 9, 0, 0],
    description: "Case with negative numbers and zero"
  },
  {
    input: {
      nums: [0, 0],
    },
    expected: [0, 0],
    description: "Case with multiple zeros"
  },
   {
    input: {
      nums: [2, 3, 0, 0],
    },
    expected: [0, 0, 0, 0],
    description: "Case with trailing zeros"
  },
  {
    input: {
      nums: [5],
    },
    expected: [1],
    description: "Edge case with a single element"
  },
  {
    input: {
      nums: [1,1,1,1],
    },
    expected: [1,1,1,1],
    description: "Case with all ones"
  }
];
