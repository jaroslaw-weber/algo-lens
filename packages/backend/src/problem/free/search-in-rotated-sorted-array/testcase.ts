import { TestCase } from "algo-lens-core";

// Define the input type based on the function signature in code.ts
interface SearchInput {
  nums: number[];
  target: number;
}

// Define the output type based on the expected return value of the core logic
type SearchOutput = number;

// Define the test cases for the search function
export const testcases: Array<TestCase<SearchInput, SearchOutput>> = [
  {
    input: {
      nums: [4, 5, 6, 7, 0, 1, 2],
      target: 0,
    },
    expected: 4,
    description: "Target in the rotated part"
  },
  {
    input: {
      nums: [4, 5, 6, 7, 0, 1, 2],
      target: 3,
    },
    expected: -1,
    description: "Target not in the array"
  },
  {
    input: {
      nums: [1],
      target: 0,
    },
    expected: -1,
    description: "Single element array, target not present"
  },
  {
    input: {
      nums: [1],
      target: 1,
    },
    expected: 0,
    description: "Single element array, target present"
  },
  {
    input: {
      nums: [5, 1, 3],
      target: 5,
    },
    expected: 0,
    description: "Target is the first element"
  },
  {
     input: {
      nums: [5, 1, 3],
      target: 3,
    },
    expected: 2,
    description: "Target in the smaller part after rotation"
  }
];
