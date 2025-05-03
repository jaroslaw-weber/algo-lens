import { Problem } from 'algo-lens-core';
import { code } from './code/typescript'; // Assuming code string is exported
import { generateSteps } from './steps';
import { testCases } from './testcase';
import { variables } from './variables';
import { groups } from './groups';
import { SearchRotatedSortedArrayInput } from './types';

export const searchRotatedSortedArrayProblem: Problem<SearchRotatedSortedArrayInput> = {
  id: 'search-in-rotated-sorted-array',
  title: 'Search in Rotated Sorted Array',
  description: `<p>There is an integer array <code>nums</code> sorted in ascending order (with <strong>distinct</strong> values).</p>
<p>Prior to being passed to your function, <code>nums</code> is possibly rotated at an unknown pivot index <code>k</code> (<code>1 <= k < nums.length</code>) such that the resulting array is <code>[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]</code> (<strong>0-indexed</strong>). For example, <code>[0,1,2,4,5,6,7]</code> might be rotated at pivot index <code>3</code> and become <code>[4,5,6,7,0,1,2]</code>.</p>
<p>Given the array <code>nums</code> <strong>after</strong> the possible rotation and an integer <code>target</code>, return the index of <code>target</code> if it is in <code>nums</code>, or <code>-1</code> if it is not in <code>nums</code>.</p>
<p>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>`,
  tags: ['Array', 'Binary Search'],
  constraints: [
    '<code>1 <= nums.length <= 5000</code>',
    '<code>-10<sup>4</sup> <= nums[i] <= 10<sup>4</sup></code>',
    'All values of <code>nums</code> are <strong>unique</strong>.',
    '<code>nums</code> is an ascending array that is possibly rotated.',
    '<code>-10<sup>4</sup> <= target <= 10<sup>4</sup></code>',
  ],
  variables,
  groups,
  testCases,
  generateSteps,
  code, // Reference the imported code string
  visualizers: [
    {
      name: 'Binary Search',
      default: true,
      description: 'Visualization of modified binary search on the rotated array',
      id: 'binary-search',
      elements: [
        { component: 'Array', props: { name: 'nums', label: 'Rotated Array' } },
        // Add values/groups to show pointers and target
        { component: 'Value', props: { name: 'target', label: 'Target' } },
        { component: 'Value', props: { name: 'left', label: 'Left Pointer' } },
        { component: 'Value', props: { name: 'right', label: 'Right Pointer' } },
        { component: 'Value', props: { name: 'mid', label: 'Mid Pointer' } },
        { component: 'Value', props: { name: 'result', label: 'Result Index' } },
      ],
    },
  ],
  difficulty: 'Medium',
  category: 'Free',
  emoji: '🔍',
};
