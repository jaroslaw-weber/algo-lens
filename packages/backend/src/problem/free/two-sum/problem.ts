import { Problem } from 'algo-lens-core';
import { code } from './code/typescript';
import { generateSteps } from './steps';
import { testCases } from './testcase';
import { variables } from './variables';
import { groups } from './groups';
import { TwoSumInput } from './types';

export const twoSumProblem: Problem<TwoSumInput> = {
  id: 'two-sum',
  title: 'Two Sum',
  description: `<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
<p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
<p>You can return the answer in any order.</p>`,
  tags: ['Array', 'Hash Table'],
  constraints: [
    '<code>2 <= nums.length <= 10<sup>4</sup></code>',
    '<code>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></code>',
    '<code>-10<sup>9</sup> <= target <= 10<sup>9</sup></code>',
    'Only one valid answer exists.',
  ],
  variables,
  groups,
  testCases,
  generateSteps,
  code,
  visualizers: [
    {
      name: 'Main',
      default: true,
      description: 'Default visualization for Two Sum',
      id: 'main',
      elements: [
        { component: 'Array', props: { name: 'nums', label: 'Input Array' } },
        {
          component: 'HashMap',
          props: { name: 'seen', label: 'Seen Numbers (Value -> Index)' },
        },
        { component: 'Array', props: { name: 'result', label: 'Result' } },
      ],
    },
  ],
  difficulty: 'Easy',
  category: 'Free',
  emoji: '🎯',
};
