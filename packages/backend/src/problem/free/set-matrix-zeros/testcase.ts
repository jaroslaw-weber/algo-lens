import type { SetMatrixZerosInput } from './types';

export const testCases: { input: SetMatrixZerosInput; output: number[][] }[] = [
  // Example 1
  {
    input: { matrix: [[1,1,1],[1,0,1],[1,1,1]] },
    output: [[1,0,1],[0,0,0],[1,0,1]],
  },
  // Example 2
  {
    input: { matrix: [[0,1,2,0],[3,4,5,2],[1,3,1,5]] },
    output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]],
  },
  // Matrix with zero in first row and first col
  {
    input: { matrix: [[0,1,1],[1,1,1],[1,1,0]] },
    output: [[0,0,0],[0,1,0],[0,0,0]],
  },
  // No zeros
  {
    input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
    output: [[1,2,3],[4,5,6],[7,8,9]],
  },
  // All zeros
  {
    input: { matrix: [[0,0],[0,0]] },
    output: [[0,0],[0,0]],
  },
  // Single row with zero
  {
    input: { matrix: [[1,0,1]] },
    output: [[0,0,0]],
  },
  // Single column with zero
  {
    input: { matrix: [[1],[0],[1]] },
    output: [[0],[0],[0]],
  },
   // Larger matrix
   {
     input: { matrix: [[1, 2, 3, 4], [5, 0, 7, 8], [0, 10, 11, 12], [13, 14, 15, 0]] },
     output: [[0, 0, 3, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
   }
];
