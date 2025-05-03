import { Problem } from 'algo-lens-core';
import { code } from './code/typescript'; // Assuming code is exported from typescript.ts
import { generateSteps } from './steps';
import { testCases } from './testcase';
import { variables } from './variables';
import { groups } from './groups';
import { ReverseLinkedListInput } from './types';

export const reverseLinkedListProblem: Problem<ReverseLinkedListInput> = {
  id: 'reverse-linked-list', // Corrected ID
  title: 'Reverse Linked List',
  description: `<p>Given the <code>head</code> of a singly linked list, reverse the list, and return the reversed list.</p>`,
  tags: ['Linked List', 'Iteration'], // Updated tags
  constraints: [
    'The number of nodes in the list is the range <code>[0, 5000]</code>.',
    '<code>-5000 <= Node.val <= 5000</code>',
  ],
  variables,
  groups,
  testCases,
  generateSteps,
  code, // Reference the imported code object/string from code/typescript.ts
  visualizers: [
    {
      name: 'List Pointers',
      default: true,
      description: 'Visualization of the linked list and pointers during reversal',
      id: 'list-pointers',
      elements: [
        // Assuming a component exists for visualizing linked lists
        { component: 'LinkedList', props: { name: 'listState', label: 'Linked List' } },
        { component: 'Value', props: { name: 'prev', label: 'Previous Node' } },
        { component: 'Value', props: { name: 'current', label: 'Current Node' } },
        // 'next' is temporary within the loop, might not need persistent visualization
      ],
    },
  ],
  difficulty: 'Easy',
  category: 'Free',
  emoji: '↩️',
};
