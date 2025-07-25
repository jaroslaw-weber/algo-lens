import { ProblemState, TestCase } from "algo-lens-core/src/types";

import { CoinChangeInput } from "./types";
// Removed import for CoinChangeInput

// Reverted TestCase signature to use tuple input type
export const testcases: TestCase<CoinChangeInput, ProblemState>[] = [
  {
    name: "Standard",
    description: "Standard test case with multiple coins",
    input: [[1, 2, 5], 11],
    expected: 3,
  },
  {
    name: "Single Coin",
    description: "Test case with only one coin type",
    input: [[1], 2],
    expected: 2,
  },
  {
    name: "Default",
    description: "Default test case for initial display",
    input: [[1, 2, 5], 7],
    expected: 2,
    isDefault: true,
  },
  {
    name: "No Solution",
    description:
      "Test case where no combination of coins can make up the amount",
    input: [[2], 3],
    expected: -1,
  },
  {
    name: "US Coins",
    description: "Test case using standard US coin denominations",
    input: [[1, 5, 10, 25], 49],
    expected: 7,
  },
];
