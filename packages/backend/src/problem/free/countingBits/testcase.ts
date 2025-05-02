import { TestCase } from "algo-lens-core";
import { CountBitsInput } from "./types"; // Import InputType from types.ts

// Define the output type based on the function signature in code.ts
type CountBitsOutput = number[];

// Define the test cases for the countBits function
export const testcases: Array<TestCase<CountBitsInput, CountBitsOutput>> = [
  {
    input: {
      n: 2,
    },
    expected: [0, 1, 1], // 0: 0, 1: 1, 2: 10
    description: "Input n=2"
  },
  {
    input: {
      n: 5,
    },
    expected: [0, 1, 1, 2, 1, 2], // 0:0, 1:1, 2:10, 3:11, 4:100, 5:101
    description: "Input n=5"
  },
  {
    input: {
      n: 0,
    },
    expected: [0], // 0: 0
    description: "Edge case: n=0"
  },
   {
    input: {
      n: 8
    },
    expected: [0, 1, 1, 2, 1, 2, 2, 3, 1], // 0..8
    description: "Input n=8"
   }
];
