import { Problem } from 'algo-lens-core';
import { code } from './code/typescript'; // Assuming code string is exported
import { generateSteps } from './steps';
import { testCases } from './testcase';
import { variables } from './variables';
import { groups } from './groups';
import { UniquePathsInput } from './types';

export const uniquePathsProblem: Problem<UniquePathsInput> = {
  id: 'unique-paths',
  title: 'Unique Paths',
  description: `<p>There is a robot on an <code>m x n</code> grid. The robot is initially located at the <strong>top-left corner</strong> (i.e., <code>grid[0][0]</code>). The robot tries to move to the <strong>bottom-right corner</strong> (i.e., <code>grid[m - 1][n - 1]</code>). The robot can only move either down or right at any point in time.</p>
<p>Given the two integers <code>m</code> and <code>n</code>, return the number of possible unique paths that the robot can take to reach the bottom-right corner.</p>
<p>The test cases are generated so that the answer will be less than or equal to <code>2 * 10<sup>9</sup></code>.</p>`,
  tags: ["Math", "Dynamic Programming", "Combinatorics", "Array"],
  constraints: [
    '<code>1 <= m, n <= 100</code>',
  ],
  variables,
  groups,
  testCases,
  generateSteps,
  code, // Reference the imported code string
  visualizers: [
    {
      name: 'DP Grid',
      default: true,
      description: 'Visualization of the DP table calculation',
      id: 'dp-grid',
      elements: [
        { component: 'Array2D', props: { name: 'dp', label: 'DP Table (Unique Paths)' } },
        // Add values/groups to show current indices and dimensions
        { component: 'Value', props: { name: 'm', label: 'Rows (m)' } },
        { component: 'Value', props: { name: 'n', label: 'Cols (n)' } },
        { component: 'Value', props: { name: 'r', label: 'Row Index (i)' } },
        { component: 'Value', props: { name: 'c', label: 'Col Index (j)' } },
        { component: 'Value', props: { name: 'result', label: 'Final Result' } },
      ],
    },
  ],
  difficulty: 'Medium',
  category: 'Free',
  emoji: '🤖',
};
