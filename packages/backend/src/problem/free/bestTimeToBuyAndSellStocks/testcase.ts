import { TestCase } from '../../problem.types';
import { MaxProfitInput } from './types'; // Assuming MaxProfitInput is defined in types.ts

export const maxProfitTestCases: TestCase<MaxProfitInput, number>[] = [
  { input: { prices: [7, 1, 5, 3, 6, 4] }, expected: 5 },
  { input: { prices: [7, 6, 4, 3, 1] }, expected: 0 },
  { input: { prices: [1, 2, 3, 4, 5] }, expected: 4 },
  { input: { prices: [2, 1, 2, 0, 1, 2] }, expected: 2 },
  { input: { prices: [1] }, expected: 0 },
  { input: { prices: [] }, expected: 0 },
];
