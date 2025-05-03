import { ProblemState, TestCase, ArrayVariable } from 'algo-lens-core';
import { CountBitsInput } from './types';

// Define test cases for countingBits
export const testcases: TestCase<CountBitsInput, ProblemState>[] = [
  {
    input: { n: 2 }, // Input n = 2
    expected: {
      variables: [
        // Expected output: [0, 1, 1] (bits in 0, 1, 2)
        { label: "result", type: "array", value: [0, 1, 1] } as ArrayVariable 
      ]
    }
  },
  {
    input: { n: 5 }, // Input n = 5
    expected: {
      variables: [
        // Expected output: [0, 1, 1, 2, 1, 2] (bits in 0, 1, 2, 3, 4, 5)
        { label: "result", type: "array", value: [0, 1, 1, 2, 1, 2] } as ArrayVariable
      ]
    }
  },
  {
    input: { n: 0 }, // Input n = 0
    expected: {
      variables: [
        // Expected output: [0] (bits in 0)
        { label: "result", type: "array", value: [0] } as ArrayVariable
      ]
    }
  }
];
