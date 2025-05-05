import { TestCase } from 'algo-lens-core';
import { Input, ExpectedOutputType } from './types';

export const testcases: TestCase<Input, ExpectedOutputType>[] = [
  { input: { n: 0 }, expected: 0 }, // Binary: 0
  { input: { n: 1 }, expected: 1 }, // Binary: 1
  { input: { n: 3 }, expected: 2 }, // Binary: 11
  { input: { n: 11 }, expected: 3 }, // Binary: 1011
  { input: { n: 128 }, expected: 1 }, // Binary: 10000000
  // Large number (32-bit integer with only the second least significant bit as 0)
  // Binary: 11111111111111111111111111111101
  { input: { n: 0b11111111111111111111111111111101 }, expected: 31 },
  // Test with a negative number (behavior might depend on representation, assuming 2's complement)
  // -1 in 32-bit two's complement is all 1s
  { input: { n: -1 }, expected: 32 }, 
  // -3 in 32-bit two's complement (11111111111111111111111111111101)
  { input: { n: -3 }, expected: 31 },
  // Max 32-bit signed integer (01111111111111111111111111111111)
  { input: { n: 2147483647 }, expected: 31 },
  // Min 32-bit signed integer (10000000000000000000000000000000)
  { input: { n: -2147483648 }, expected: 1 },
];
