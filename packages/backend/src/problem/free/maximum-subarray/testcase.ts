import { TestCase } from "algo-lens-core";
import { MaximumSubarrayInput } from "./types"; // Import InputType from types.ts

// Define the output type based on the function signature in code.ts
type MaximumSubarrayOutput = number;

// Define the test cases for the maxSubArray function
export const testcases: Array<TestCase<MaximumSubarrayInput, MaximumSubarrayOutput>> = [
  {
    input: {
      nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    },
    expected: 6, // Subarray [4, -1, 2, 1] has the largest sum 6
    description: "Standard case with positive and negative numbers"
  },
  {
    input: {
      nums: [1],
    },
    expected: 1,
    description: "Edge case: Single positive element"
  },
  {
    input: {
      nums: [5, 4, -1, 7, 8],
    },
    expected: 23, // The entire array is the maximum subarray
    description: "All positive (or mostly positive) numbers"
  },
  {
    input: {
        nums: [-1, -2, -3, -4],
    },
    expected: -1, // The maximum subarray is just [-1]
    description: "All negative numbers"
  }
];
