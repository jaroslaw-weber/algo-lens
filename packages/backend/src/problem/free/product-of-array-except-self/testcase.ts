import { TestCase } from "algo-lens-core";
import { ProductExceptSelfInput } from "./types";

export const testcases = [
  {
    input: [1, 2, 3, 4, 5],
    expected: [120, 60, 40, 30, 24],
  },
  {
    input: [1, 2],
    expected: [2, 1],
  },
  {
    // Changed from [4, 3, 2, 1] (len 4) to [1, 2, 3, 4, 5] (len 5)
    input: [1, 2, 3, 4, 5],
    expected: [120, 60, 40, 30, 24],
    isDefault: true,
  },
  {
    input: [0, 1, 2, 3, 4],
    expected: [24, 0, 0, 0, 0],
  },
];
