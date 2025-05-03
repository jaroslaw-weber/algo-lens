import { Problem } from 'algo-lens-core';
import { code } from './code/typescript'; // Assuming code string is exported
import { generateSteps } from './steps';
import { testCases } from './testcase';
import { variables } from './variables';
import { groups } from './groups';
import { SetMatrixZerosInput } from './types';

export const setMatrixZerosProblem: Problem<SetMatrixZerosInput> = {
  id: 'set-matrix-zeroes',
  title: 'Set Matrix Zeroes',
  description: `<p>Given an <code>m x n</code> integer matrix <code>matrix</code>, if an element is <code>0</code>, set its entire row and column to <code>0</code>'s.</p>
<p>You must do it <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank">in-place</a>.</p>`,
  tags: ["Array", "Hash Table", "Matrix"], // Updated tags
  constraints: [
    '<code>m == matrix.length</code>',
    '<code>n == matrix[0].length</code>',
    '<code>1 <= m, n <= 200</code>',
    '<code>-2<sup>31</sup> <= matrix[i][j] <= 2<sup>31</sup> - 1</code>',
    'A straightforward solution using O(mn) space is probably a bad idea.',
    'A simple improvement uses O(m + n) space, but still not the best solution.',
    'Could you devise a constant space solution?',
  ],
  variables,
  groups,
  testCases,
  generateSteps,
  code, // Reference the imported code string
  visualizers: [
    {
      name: 'Matrix View',
      default: true,
      description: 'Visualization of the matrix modification process',
      id: 'matrix-view',
      elements: [
        { component: 'Array2D', props: { name: 'matrix', label: 'Matrix' } },
        // Add values/groups to show flags or current indices
        { component: 'Value', props: { name: 'firstRowZero', label: 'First Row Zero?' } },
        { component: 'Value', props: { name: 'firstColZero', label: 'First Col Zero?' } },
        { component: 'Value', props: { name: 'r', label: 'Row Index (i)' } },
        { component: 'Value', props: { name: 'c', label: 'Col Index (j)' } },
      ],
    },
  ],
  difficulty: 'Medium',
  category: 'Free',
  emoji: '0️⃣',
};
