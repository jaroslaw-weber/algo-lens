import { TestCase } from "algo-lens-core";
// Removed import for CoinChangeInput

// Reverted TestCase signature to use tuple input type
export const testcases: TestCase<[number[], number], number>[] = [
  // Existing cases (reverted format)
  { input: [[1, 2, 5], 11], expected: 3 },
  { input: [[1], 2], expected: 2 },

  // Corrected existing case (reverted format)
  { input: [[1, 2, 5], 7], expected: 2 }, // Corrected: 5+2=7 (2 coins)

  // Added generated cases (reverted format)
  { input: [[2], 3], expected: -1 },
  { input: [[1, 5, 10, 25], 49], expected: 7 }, // 25 + 10 + 10 + 1 + 1 + 1 + 1 = 49 (7 coins)
];
