import { ProblemState, TestCase, BooleanVariable } from 'algo-lens-core';
import { ContainsDuplicateInput } from './types';

// Define a few basic test cases
export const testcases: TestCase<ContainsDuplicateInput, ProblemState>[] = [
  {
    input: { nums: [1, 2, 3, 1] }, // Contains duplicate
    expected: {
      variables: [
        // Assuming the final boolean result is stored in a variable named 'result'
        { label: "result", type: "boolean", value: true } as BooleanVariable 
      ]
    }
  },
  {
    input: { nums: [1, 2, 3, 4] }, // No duplicates
    expected: {
      variables: [
        { label: "result", type: "boolean", value: false } as BooleanVariable
      ]
    }
  },
  {
    input: { nums: [] }, // Empty array
    expected: {
      variables: [
        { label: "result", type: "boolean", value: false } as BooleanVariable
      ]
    }
  },
  {
    input: { nums: [1, 1, 1, 1] }, // All duplicates
    expected: {
      variables: [
        { label: "result", type: "boolean", value: true } as BooleanVariable
      ]
    }
  }
];
