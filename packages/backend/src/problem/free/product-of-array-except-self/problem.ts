import { Problem } from 'algo-lens-core';
import { code } from './code/typescript'; // Assuming code is exported from typescript.ts
import { generateSteps } from './steps';
import { testCases } from './testcase';
import { variables } from './variables';
import { groups } from './groups';
import { ProductOfArrayExceptSelfInput } from './types';

export const productOfArrayExceptSelfProblem: Problem<ProductOfArrayExceptSelfInput> = {
  id: 'product-of-array-except-self',
  title: 'Product of Array Except Self',
  description: `<p>Given an integer array <code>nums</code>, return an array <code>answer</code> such that <code>answer[i]</code> is equal to the product of all the elements of <code>nums</code> except <code>nums[i]</code>.</p>
<p>The product of any prefix or suffix of <code>nums</code> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.</p>
<p>You must write an algorithm that runs in <code>O(n)</code> time and without using the division operation.</p>`,
  tags: ['Array', 'Prefix Sum'],
  constraints: [
    '<code>2 <= nums.length <= 10<sup>5</sup></code>',
    '<code>-30 <= nums[i] <= 30</code>',
    'The product of any prefix or suffix of <code>nums</code> is guaranteed to fit in a 32-bit integer.',
  ],
  variables,
  groups,
  testCases,
  generateSteps,
  code, // Reference the imported code object/string
  visualizers: [
    {
      name: 'Main',
      default: true,
      description: 'Default visualization for Product of Array Except Self',
      id: 'main',
      elements: [
        { component: 'Array', props: { name: 'nums', label: 'Input Array' } },
        { component: 'Array', props: { name: 'prefix', label: 'Prefix Products' } },
        { component: 'Array', props: { name: 'suffix', label: 'Suffix Products' } },
        { component: 'Array', props: { name: 'result', label: 'Result Array' } },
      ],
    },
  ],
  difficulty: 'Medium',
  category: 'Free',
  emoji: '✖️',
};
