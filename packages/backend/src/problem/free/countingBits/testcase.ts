import { TestCase } from "algo-lens-core";

// Define test cases for countingBits
export const testcases: TestCase<number, number[]>[] = [
  {
    input: 2, // Input n = 2
    // Expected output: [0, 1, 1] (bits in 0, 1, 2)
    expected: [0, 1, 1],
  },
  {
    input: 5, // Input n = 5
    // Expected output: [0, 1, 1, 2, 1, 2] (bits in 0, 1, 2, 3, 4, 5)
    expected: [0, 1, 1, 2, 1, 2],
  },
  {
    input: 0, // Input n = 0
    // Expected output: [0] (bits in 0)
    expected: [0],
  },
  {
    input: 1, // Input n = 1
    // Expected output: [0, 1] (bits in 0, 1)
    expected: [0, 1],
  },
];
