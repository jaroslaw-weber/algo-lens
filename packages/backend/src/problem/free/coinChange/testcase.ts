import { ProblemState, TestCase } from "algo-lens-core";
import { CoinChangeInput } from "./types";
// Removed import for CoinChangeInput

// Reverted TestCase signature to use tuple input type
export const testcases: TestCase<CoinChangeInput, ProblemState>[] = [
  { input: [[1, 2, 5], 11], expected: 3 },
  { input: [[1], 2], expected: 2 },
  { input: [[1, 2, 5], 7], expected: 2, isDefault: true },
  { input: [[2], 3], expected: -1 },
  { input: [[1, 5, 10, 25], 49], expected: 7 },
];
