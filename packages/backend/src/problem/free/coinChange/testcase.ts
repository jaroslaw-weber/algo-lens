import { ProblemState, TestCase } from "algo-lens-core";
import { CoinChangeInput } from "./types";
// Removed import for CoinChangeInput

// Reverted TestCase signature to use tuple input type
export const testcases: TestCase<CoinChangeInput, ProblemState>[] = [
  { name: "Standard", input: [[1, 2, 5], 11], expected: 3 },
  { name: "Single Coin", input: [[1], 2], expected: 2 },
  { name: "Default", input: [[1, 2, 5], 7], expected: 2, isDefault: true },
  { name: "No Solution", input: [[2], 3], expected: -1 },
  { name: "US Coins", input: [[1, 5, 10, 25], 49], expected: 7 },
];
