import { TestCase } from '../../problem.types';
import { CoinChangeInput } from './types'; // Assuming CoinChangeInput is defined in types.ts

export const coinChangeTestCases: TestCase<CoinChangeInput, number>[] = [
  { input: { coins: [1, 2, 5], target: 11 }, expected: 3 },
  { input: { coins: [2], target: 3 }, expected: -1 },
  { input: { coins: [1], target: 0 }, expected: 0 },
  { input: { coins: [1], target: 1 }, expected: 1 },
  { input: { coins: [1], target: 2 }, expected: 2 },
  { input: { coins: [186, 419, 83, 408], target: 6249 }, expected: 20 },
];
