import { TestCase } from "algo-lens-core";
// Removed import for CoinChangeInput

// Reverted TestCase signature to use tuple input type
export const testcases: TestCase<[number[], number], number>[] = [
  // Existing cases (reverted format)
  { input: [[1, 2, 5], 11], expected: 3 },
  { input: [[1], 2], expected: 2 },
  { input: [[186, 419, 83, 408], 6249], expected: 20 },
  { input: [[1, 2, 5], 7], expected: 2 },
  { input: [[1, 2, 5], 6], expected: 2 },

  // Corrected existing case (reverted format)
  { input: [[1, 2, 5], 7], expected: 2 }, // Corrected: 5+2=7 (2 coins)

  // Added generated cases (reverted format)
  { input: [[2], 3], expected: -1 },
  { input: [[1], 0], expected: 0 },
  { input: [[1, 2147483647], 2], expected: 2 }, // 1+1=2
  { input: [[1, 5, 10, 25], 49], expected: 7 }, // 25 + 10 + 10 + 1 + 1 + 1 + 1 = 49 (7 coins)
  { input: [[3, 7, 405, 436], 8839], expected: 25 }, // Example from LC discussions
];
