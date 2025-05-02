import { TestCase } from "algo-lens-core";

// Define the input type based on the function signature in code.ts
interface UniquePathsInput {
  m: number;
  n: number;
}

// Define the output type based on the expected return value of the core logic
type UniquePathsOutput = number;

// Define the test cases for the uniquePaths function
export const testcases: Array<TestCase<UniquePathsInput, UniquePathsOutput>> = [
  {
    input: {
      m: 3,
      n: 7,
    },
    expected: 28,
    description: "Example case from description m=3, n=7"
  },
  {
    input: {
      m: 3,
      n: 2,
    },
    expected: 3,
    description: "Smaller grid m=3, n=2"
  },
  {
    input: {
      m: 1,
      n: 1,
    },
    expected: 1,
    description: "Edge case: 1x1 grid"
  },
   {
    input: {
      m: 5,
      n: 1,
    },
    expected: 1,
    description: "Edge case: Column vector"
   },
   {
     input: {
       m: 1,
       n: 5
     },
     expected: 1,
     description: "Edge case: Row vector"
   }
];
