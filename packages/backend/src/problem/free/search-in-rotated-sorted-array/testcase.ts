import type { SearchRotatedSortedArrayInput } from './types';

export const testCases: { input: SearchRotatedSortedArrayInput; output: number }[] = [
  // Standard example
  {
    input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
    output: 4,
  },
  // Target not found
  {
    input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 },
    output: -1,
  },
  // Target is the first element
   {
    input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 4 },
    output: 0,
  },
   // Target is the last element
   {
    input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 2 },
    output: 6,
  },
  // Array not rotated
  {
    input: { nums: [0, 1, 2, 4, 5, 6, 7], target: 4 },
    output: 3,
  },
  // Array not rotated, target not found
  {
    input: { nums: [0, 1, 2, 4, 5, 6, 7], target: 8 },
    output: -1,
  },
  // Single element array, target found
  {
    input: { nums: [1], target: 1 },
    output: 0,
  },
  // Single element array, target not found
  {
    input: { nums: [1], target: 0 },
    output: -1,
  },
  // Two elements, rotated, target first
  {
    input: { nums: [3, 1], target: 3 },
    output: 0,
  },
   // Two elements, rotated, target second
  {
    input: { nums: [3, 1], target: 1 },
    output: 1,
  },
   // Two elements, not rotated, target first
  {
    input: { nums: [1, 3], target: 1 },
    output: 0,
  },
   // Two elements, not rotated, target second
  {
    input: { nums: [1, 3], target: 3 },
    output: 1,
  },
  // Larger example from description
   {
    input: { nums: [13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], target: 1 },
    output: 4,
  },
];
