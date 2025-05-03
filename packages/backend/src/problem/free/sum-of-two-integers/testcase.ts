import type { SumOfTwoIntegersInput } from './types';

export const testCases: { input: SumOfTwoIntegersInput; output: number }[] = [
  // Basic positive sum
  {
    input: { a: 1, b: 2 },
    output: 3,
  },
  // Positive sum with carry
  {
    input: { a: 2, b: 3 },
    output: 5,
  },
  // One positive, one zero
  {
    input: { a: 5, b: 0 },
    output: 5,
  },
   // One negative, one zero
  {
    input: { a: -5, b: 0 },
    output: -5,
  },
  // Two negatives
  {
    input: { a: -1, b: -2 },
    output: -3,
  },
   // One positive, one negative (result positive)
  {
    input: { a: 5, b: -3 },
    output: 2,
  },
   // One positive, one negative (result negative)
  {
    input: { a: 3, b: -5 },
    output: -2,
  },
   // One positive, one negative (result zero)
  {
    input: { a: 5, b: -5 },
    output: 0,
  },
  // Larger numbers
   {
    input: { a: 100, b: 250 },
    output: 350,
   },
    // Larger numbers with negative
   {
    input: { a: -100, b: 250 },
    output: 150,
   },
];
