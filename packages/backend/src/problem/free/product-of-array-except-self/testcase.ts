import { TestCase } from "algo-lens-core";
import { ProductExceptSelfInput } from "./types";

export const testcases: TestCase<ProductExceptSelfInput, any>[] = [
  {
    input: [1, 2, 3, 4, 5],
    expected: 120,
  },
  // Add more test cases here if needed
  {
    input: [-1, 1, 0, -3, 3],
    expected: 0,
  },
  {
    input: [2, 3, 0, 0],
    expected: 0,
  },
  {
    input: [],
    expected: 1,
  },
];
