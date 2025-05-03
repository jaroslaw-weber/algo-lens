// Imports specific utility functions and type definitions
import { Problem } from 'algo-lens-core';
import { ContainsDuplicateInput } from './types';
import { code } from './code/typescript'; // Import code string
import { generateSteps } from './steps';   // Import new step generator
import { variables } from './variables'; // Import variable metadata
import { groups } from './groups';     // Import groups metadata
import { testcases } from './testcase'; // Import test cases

// The old step generation function is removed.

// Export the complete problem setup using the new structure
export const containsDuplicateProblem: Problem<ContainsDuplicateInput> = {
  id: 'contains-duplicate',
  title: 'Contains Duplicate',
  description: `<p>Given an integer array <code>nums</code>, return <code>true</code> if any value appears <strong>at least twice</strong> in the array, and return <code>false</code> if every element is distinct.</p>`,
  tags: ['Array', 'Hash Table', 'Set'], // Updated tags
  constraints: [
    '<code>1 <= nums.length <= 10<sup>5</sup></code>',
    '<code>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></code>',
  ],
  variables, // Add variable metadata
  groups,    // Add groups metadata
  testCases: testcases.map(tc => ({ input: tc.input })), // Map testcases to only include input
  generateSteps, // Use new step generator
  code, // Use imported code string
  visualizers: [ // Add default visualizer configuration
      {
        name: 'HashSet Check',
        default: true,
        description: 'Visualization using a HashSet to track seen numbers',
        id: 'hashset-check',
        elements: [
          { component: 'Array', props: { name: 'nums', label: 'Input Array' } },
          { component: 'Set', props: { name: 'seenSet', label: 'Seen Numbers' } },
          { component: 'Value', props: { name: 'i', label: 'Current Index' } },
          { component: 'Value', props: { name: 'num', label: 'Current Number' } },
          { component: 'Value', props: { name: 'result', label: 'Result' } },
        ],
      },
  ],
  difficulty: 'Easy',
  category: 'Free',
  emoji: '👯',
};
