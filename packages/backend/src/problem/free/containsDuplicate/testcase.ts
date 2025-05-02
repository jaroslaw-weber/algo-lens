import { TestCase } from "algo-lens-core";
import { ContainsDuplicateInput } from "./types"; // Import InputType from types.ts

// Define the output type based on the function signature in code.ts
type ContainsDuplicateOutput = boolean;

// Define the test cases for the containsDuplicate function
export const testcases: Array<TestCase<ContainsDuplicateInput, ContainsDuplicateOutput>> = [
  {
    input: {
      nums: [1, 2, 3, 1],
    },
    expected: true,
    description: "Standard case with duplicate"
  },
  {
    input: {
      nums: [1, 2, 3, 4],
    },
    expected: false,
    description: "Case with no duplicates"
  },
  {
    input: {
      nums: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2],
    },
    expected: true,
    description: "Case with multiple duplicates"
  },
  {
    input: {
      nums: [],
    },
    expected: false,
    description: "Edge case: Empty array"
  },
  {
    input: {
      nums: [5],
    },
    expected: false,
    description: "Edge case: Single element array"
  }
];
