import { TestCase } from "algo-lens-core";
import { ProductExceptSelfInput } from "./types";

export const testcases: TestCase<ProductExceptSelfInput, any>[] = [
  {
    input: [1, 2, 3, 4, 5],
    expected: [120, 60, 40, 30, 24],
  },
  {
    input: [1, 2],
    expected: [2, 1],
  },
  {
    input: [4, 3, 2, 1],
    expected: [6, 8, 12, 24],
  },
  {
    input: [0, 1, 2, 3, 4],
    expected: [24, 0, 0, 0, 0],
  },
];
