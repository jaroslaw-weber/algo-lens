import { TestCase } from "algo-lens-core";
import { HouseRobberInput } from "./types"; // Import InputType from types.ts

// Define the output type based on the function signature in code.ts
type HouseRobberOutput = number;

// Define the test cases for the rob function
export const testcases: Array<TestCase<HouseRobberInput, HouseRobberOutput>> = [
  {
    input: {
      nums: [1, 2, 3, 1],
    },
    expected: 4, // Rob house 1 (1) + house 3 (3) = 4
    description: "Standard case 1"
  },
  {
    input: {
      nums: [2, 7, 9, 3, 1],
    },
    expected: 12, // Rob house 1 (2) + house 3 (9) + house 5 (1) = 12
    description: "Standard case 2"
  },
  {
    input: {
      nums: [2, 1, 1, 2],
    },
    expected: 4, // Rob house 1 (2) + house 4 (2) = 4
    description: "Case where skipping more than one house is optimal"
  },
  {
    input: {
      nums: [],
    },
    expected: 0,
    description: "Edge case: Empty array"
  },
   {
    input: {
      nums: [10],
    },
    expected: 10,
    description: "Edge case: Single house"
   }
];
