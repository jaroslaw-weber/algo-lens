import { TestCase } from "algo-lens-core";

// Define test cases for countingBits (LeetCode #338)
// Input: n (number)
// Output: number[] where output[i] is the number of 1's in the binary representation of i.
export const testcases = [
  {
    name: "N=2",
    input: 2,
    expected: [0, 1, 1],
  },
  {
    name: "N=5",
    input: 5,
    expected: [0, 1, 1, 2, 1, 2],
  },
  {
    name: "N=0",
    input: 0,
    expected: [0],
  },
  {
    name: "N=1",
    input: 1,
    expected: [0, 1],
  },
  {
    name: "Default N=9",
    input: 9, // Changed from 3 to 9
    expected: [0, 1, 1, 2, 1, 2, 2, 3, 1, 2],
    isDefault: true,
  },
  {
    name: "N=4",
    input: 4,
    expected: [0, 1, 1, 2, 1],
  },
  {
    name: "N=7",
    input: 7,
    expected: [0, 1, 1, 2, 1, 2, 2, 3],
  },
  {
    name: "N=8",
    input: 8,
    expected: [0, 1, 1, 2, 1, 2, 2, 3, 1],
  },
  {
    name: "N=10",
    input: 10,
    expected: [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2],
  },
];
