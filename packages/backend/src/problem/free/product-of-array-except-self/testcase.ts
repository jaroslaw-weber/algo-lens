import { TestCase } from "algo-lens-core";
import { ProductExceptSelfInput } from "./types";

export const testcases: TestCase<ProductExceptSelfInput, any>[] = [
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
      nums: [2, 3, 0, 0],
    },
  },
];
