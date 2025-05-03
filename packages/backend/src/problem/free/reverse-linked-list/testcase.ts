import type { ReverseLinkedListInput, ListNode } from './types';
import { createList, listToArray } from './utils'; // Import helpers

// Define test cases using the input interface and expecting the output list as an array
export const testCases: { input: ReverseLinkedListInput; output: number[] }[] = [
  {
    input: { head: createList([1, 2, 3, 4, 5]) },
    output: [5, 4, 3, 2, 1],
  },
  {
    input: { head: createList([1, 2]) },
    output: [2, 1],
  },
  {
    input: { head: createList([1]) },
    output: [1],
  },
  {
    input: { head: createList([]) },
    output: [],
  },
   {
    input: { head: null }, // Explicitly test null input
    output: [],
  },
];
