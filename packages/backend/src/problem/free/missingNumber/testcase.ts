import { TestCase } from "algo-lens-core";
import { MissingNumberInput } from "./types"; // Import InputType from types.ts

// Define the output type based on the function signature in code.ts
type MissingNumberOutput = number;

// Define the test cases for the missingNumber function
export const testcases: Array<TestCase<MissingNumberInput, MissingNumberOutput>> = [
  {
    input: {
      nums: [3, 0, 1],
    },
    expected: 2, // The range is [0, 3], missing number is 2
    description: "Standard case"
  },
  {
    input: {
      nums: [0, 1],
    },
    expected: 2, // The range is [0, 2], missing number is 2
    description: "Missing number is outside the initial array bounds"
  },
  {
    input: {
      nums: [9, 6, 4, 2, 3, 5, 7, 0, 1],
    },
    expected: 8, // The range is [0, 9], missing number is 8
    description: "Larger array"
  },
  {
    input: {
        nums: [0],
    },
    expected: 1, // The range is [0, 1], missing number is 1
    description: "Edge case: Single element array starting at 0"
  }
];
