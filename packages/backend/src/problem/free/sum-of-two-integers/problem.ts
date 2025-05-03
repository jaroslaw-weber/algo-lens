import { Problem } from 'algo-lens-core';
import { code } from './code/typescript'; // Assuming code string is exported
import { generateSteps } from './steps';
import { testCases } from './testcase';
import { variables } from './variables';
import { groups } from './groups';
import { SumOfTwoIntegersInput } from './types';

export const sumOfTwoIntegersProblem: Problem<SumOfTwoIntegersInput> = {
  id: 'sum-of-two-integers',
  title: 'Sum of Two Integers',
  description: `<p>Given two integers <code>a</code> and <code>b</code>, return the sum of the two integers without using the operators <code>+</code> and <code>-</code>.</p>`,
  tags: ["Bit Manipulation", "Math"],
  constraints: [
    '<code>-1000 <= a, b <= 1000</code>',
  ],
  variables,
  groups,
  testCases,
  generateSteps,
  code, // Reference the imported code string
  visualizers: [
    {
      name: 'Bitwise Addition',
      default: true,
      description: 'Visualization of adding two integers using bitwise operations',
      id: 'bitwise-addition',
      elements: [
        // Assuming components exist for displaying numbers (decimal/binary)
        { component: 'Value', props: { name: 'a', label: 'A (Current Sum)' } },
        { component: 'Value', props: { name: 'b', label: 'B (Current Carry)' } },
        { component: 'Value', props: { name: 'carry_step', label: 'Carry (Step)' } }, // Carry calculated in a step
        // Potentially add binary representations if visualizer components support them
        { component: 'BinaryValue', props: { name: 'a_bin', label: 'A (Binary)' } },
        { component: 'BinaryValue', props: { name: 'b_bin', label: 'B (Binary)' } },
        { component: 'BinaryValue', props: { name: 'carry_bin', label: 'Carry (Binary)' } },
      ],
    },
  ],
  difficulty: 'Medium',
  category: 'Free',
  emoji: '➕',
};
