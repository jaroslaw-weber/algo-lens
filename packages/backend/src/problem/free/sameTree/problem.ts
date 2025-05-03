import { Problem } from 'algo-lens-core';
import { code } from './code/typescript'; // Assuming code string is exported
import { generateSteps } from './steps';
import { testCases } from './testcase';
import { variables } from './variables';
import { groups } from './groups';
import { SameTreeInput } from './types';

export const sameTreeProblem: Problem<SameTreeInput> = {
  id: 'same-tree',
  title: 'Same Tree',
  description: `<p>Given the roots of two binary trees <code>p</code> and <code>q</code>, write a function to check if they are the same or not.</p>
<p>Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.</p>`,
  tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
  constraints: [
    'The number of nodes in both trees is in the range <code>[0, 100]</code>.',
    '<code>-10<sup>4</sup> <= Node.val <= 10<sup>4</sup></code>',
  ],
  variables,
  groups,
  testCases,
  generateSteps,
  code, // Reference the imported code string
  visualizers: [
    {
      name: 'Tree Comparison',
      default: true,
      description: 'Visualization of comparing two binary trees node by node',
      id: 'tree-comparison',
      elements: [
        // Assuming a component exists for visualizing binary trees side-by-side or overlaid
        { component: 'BinaryTree', props: { name: 'pTree', label: 'Tree P' } },
        { component: 'BinaryTree', props: { name: 'qTree', label: 'Tree Q' } },
        // Could add values/groups to show current nodes being compared or comparison result
        { component: 'Value', props: { name: 'currentNodeP', label: 'Current P Node' } },
        { component: 'Value', props: { name: 'currentNodeQ', label: 'Current Q Node' } },
        { component: 'Value', props: { name: 'comparisonResult', label: 'Comparison Result' } },
      ],
    },
  ],
  difficulty: 'Easy',
  category: 'Free',
  emoji: '🌲',
};
