import { ProblemState, TestCase } from 'algo-lens-core';
import { MaxProfitInput } from './types'; // Assuming MaxProfitInput is defined in types.ts

export const maxProfitTestCases: TestCase<MaxProfitInput, ProblemState>[] = [
  { input: { prices: [2, 1, 2, 0, 1, 2] }, expected: { variables: [], breakpoint: 0 } },
  { input: { prices: [7, 1, 5, 3, 6, 4] }, expected: { variables: [], breakpoint: 0 } },
  { input: { prices: [7, 6, 4, 3, 1] }, expected: { variables: [], breakpoint: 0 } },
  { input: { prices: [1, 2, 3, 4, 5] }, expected: { variables: [], breakpoint: 0 } },
  { input: { prices: [1] }, expected: { variables: [], breakpoint: 0 } },
  { input: { prices: [] }, expected: { variables: [], breakpoint: 0 } },
];