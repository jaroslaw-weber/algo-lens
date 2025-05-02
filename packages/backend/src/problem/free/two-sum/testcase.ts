import { TestCase } from "algo-lens-core";

// Define the input type based on the function signature in code.ts
interface TwoSumInput {
  nums: number[];
  target: number;
}

// Define the output type based on the expected return value of the core logic
type TwoSumOutput = number[];

// Define the test cases for the twoSum function
export const testcases: Array<TestCase<TwoSumInput, TwoSumOutput>> = [
  {
    input: {
      nums: [2, 7, 11, 15],
      target: 9,
    },
    expected: [0, 1],
    description: "Standard case, target is sum of first two elements"
  },
  {
    input: {
      nums: [3, 2, 4],
      target: 6,
    },
    expected: [1, 2],
    description: "Target is sum of last two elements"
  },
  {
    input: {
      nums: [3, 3],
      target: 6,
    },
    expected: [0, 1],
    description: "Input contains duplicate numbers"
  },
   {
    input: {
      nums: [1, 2, 3, 4, 5],
      target: 10,
    },
    // Assuming the code returns a specific value or behavior for no solution, like [-1, -1] based on the code string
    expected: [-1, -1], // Or adjust based on actual implementation if it throws an error or returns null/undefined
    description: "No two numbers sum up to the target"
   },
   {
     input: {
       nums: [-1, -3, 5, 9],
       target: 4
     },
     expected: [0, 2], // Indices of -1 and 5
     description: "Case with negative numbers"
   }
];
