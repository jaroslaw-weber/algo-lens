import { ContainsDuplicateInput } from './types';

// Define test cases using the input interface and expecting a boolean output
export const testcases: { input: ContainsDuplicateInput; output: boolean }[] = [
  {
    input: { nums: [1, 2, 3, 1] }, // Contains duplicate
    output: true
  },
  {
    input: { nums: [1, 2, 3, 4] }, // No duplicates
    output: false
  },
  {
    input: { nums: [] }, // Empty array
    output: false
  },
  {
    input: { nums: [1, 1, 1, 1] }, // All duplicates
    output: true
  },
  {
    input: { nums: [1] }, // Single element
    output: false
  },
  {
    input: { nums: [1, 2, 3, 4, 5, 6, 1] }, // Duplicate at the end
    output: true
  }
];
