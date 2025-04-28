import { TestCase } from '../../problem.types';
import { ClimbingStairsInput } from './types'; // Assuming ClimbingStairsInput is defined in types.ts

export const climbingStairsTestCases: TestCase<ClimbingStairsInput, number>[] = [
  { input: { n: 1 }, expected: 1 },
  { input: { n: 2 }, expected: 2 },
  { input: { n: 3 }, expected: 3 },
  { input: { n: 5 }, expected: 8 },
  { input: { n: 8 }, expected: 34 },
];
