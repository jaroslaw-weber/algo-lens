import type { SameTreeInput, TreeNode } from './types';
import { createTree } from './utils'; // Import tree creation helper

// Define test cases using the input interface and expecting a boolean output
export const testCases: { input: SameTreeInput; output: boolean }[] = [
  // Case 1: Identical trees
  {
    input: { p: createTree([1, 2, 3]), q: createTree([1, 2, 3]) },
    output: true,
  },
  // Case 2: Different structure (p has left child, q doesn't)
  {
    input: { p: createTree([1, 2]), q: createTree([1, null, 2]) },
    output: false,
  },
  // Case 3: Different values
  {
    input: { p: createTree([1, 2, 1]), q: createTree([1, 1, 2]) },
    output: false,
  },
  // Case 4: More complex identical trees
  {
    input: { p: createTree([5, 3, 6, 2, 4]), q: createTree([5, 3, 6, 2, 4]) },
    output: true,
  },
  // Case 5: More complex different trees (structure)
  {
    input: { p: createTree([5, 3, 6, 2, 4]), q: createTree([5, 3, 6, null, 4, null, 2]) },
    output: false,
  },
   // Case 6: More complex different trees (value)
  {
    input: { p: createTree([5, 3, 6, 2, 4]), q: createTree([5, 3, 6, 2, 99]) },
    output: false,
  },
  // Case 7: Both trees are empty
  {
    input: { p: createTree([]), q: createTree([]) },
    output: true,
  },
   // Case 8: One tree is empty, the other is not
  {
    input: { p: createTree([1]), q: createTree([]) },
    output: false,
  },
   // Case 9: Both trees are null (explicitly)
  {
    input: { p: null, q: null },
    output: true,
  },
    // Case 10: One tree null, other not
  {
    input: { p: createTree([1]), q: null },
    output: false,
  },
];
