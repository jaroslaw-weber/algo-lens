import { TestCase } from "algo-lens-core";

// Define test cases for countingBits (LeetCode #338)
// Input: n (number)
// Output: number[] where output[i] is the number of 1's in the binary representation of i.
export const testcases = [
  {
    input: 2,
    expected: [0, 1, 1],
  },
  {
    input: 5,
    expected: [0, 1, 1, 2, 1, 2],
  },
  {
    input: 0,
    expected: [0],
  },
  {
    input: 1,
    expected: [0, 1],
  },
  {
    input: 3,
    expected: [0, 1, 1, 2],
  ,
    isDefault: true},
  {
    input: 4,
    expected: [0, 1, 1, 2, 1],
  },
  {
    input: 7,
    expected: [0, 1, 1, 2, 1, 2, 2, 3],
  },
  {
    input: 8,
    expected: [0, 1, 1, 2, 1, 2, 2, 3, 1],
  },
  {
    input: 10,
    expected: [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2],
  }
];
