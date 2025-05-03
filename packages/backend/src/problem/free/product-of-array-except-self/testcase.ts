import { ProductExceptSelfInput } from './types';

interface TestCase {
  input: ProductExceptSelfInput;
  // Add other properties like expected output if needed later
}

export const testcases: TestCase[] = [
  {
    input: {
      nums: [1, 2, 3, 4, 5],
    },
  },
  // Add more test cases here if needed
  {
    input: {
      nums: [-1, 1, 0, -3, 3],
    },
  },
  {
    input: {
        nums: [2, 3, 0, 0]
    }
  }
];
