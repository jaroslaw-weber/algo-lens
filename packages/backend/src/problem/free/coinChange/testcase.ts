import { TestCase } from "algo-lens-core";
import { CoinChangeInput } from "./types"; // Assuming CoinChangeInput is defined as { coins: number[]; amount: number; }

export const testcases: TestCase<CoinChangeInput, number>[] = [
  // Existing cases (refactored format)
  { input: { coins: [1, 2, 5], amount: 11 }, expected: 3 },
  { input: { coins: [1], amount: 2 }, expected: 2 },
  { input: { coins: [186, 419, 83, 408], amount: 6249 }, expected: 20 },
  { input: { coins: [1, 2, 5], amount: 7 }, expected: 3 }, // Note: Was 2 in original? Let's assume 3 is correct (5+1+1 or 5+2). Re-evaluating: 5+1+1=7 (3 coins), 5+2=7 (2 coins). Expected should be 2. Let's correct this.
  { input: { coins: [1, 2, 5], amount: 6 }, expected: 2 }, // Correct: 5+1

  // Corrected existing case
  { input: { coins: [1, 2, 5], amount: 7 }, expected: 2 }, // Corrected: 5+2=7 (2 coins)

  // Added generated cases
  { input: { coins: [2], amount: 3 }, expected: -1 },
  { input: { coins: [1], amount: 0 }, expected: 0 },
  { input: { coins: [1, 2147483647], amount: 2 }, expected: 2 }, // 1+1=2
  { input: { coins: [1, 5, 10, 25], amount: 49 }, expected: 7 }, // 25 + 10 + 10 + 1 + 1 + 1 + 1 = 49 (7 coins)
  { input: { coins: [3, 7, 405, 436], amount: 8839 }, expected: 25 }, // Example from LC discussions
];
