
import { ProblemState, TestCase } from 'algo-lens-core';
import { ClimbingStairsInput } from './types'; // Assuming ClimbingStairsInput is defined in types.ts
export const climbingStairsTestCases: TestCase<ClimbingStairsInput, {result:number}>[] = [
  { input: { n: 5 }, expected: { result: 8 } },
  { input: { n: 1 }, expected: { result: 1 } },
  { input: { n: 2 }, expected: { result: 2 } },
  { input: { n: 3 }, expected: { result: 3 } },
  { input: { n: 8 }, expected: { result: 34 } },
];
