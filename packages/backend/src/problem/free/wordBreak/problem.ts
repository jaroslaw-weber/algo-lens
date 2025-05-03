import { Problem } from 'algo-lens-core';
import { code } from './code/typescript'; // Assuming code string is exported
import { generateSteps } from './steps';
import { testCases } from './testcase';
import { variables } from './variables';
import { groups } from './groups';
import { WordBreakInput } from './types';

export const wordBreakProblem: Problem<WordBreakInput> = {
  id: 'word-break',
  title: 'Word Break',
  description: `<p>Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.</p>
<p><strong>Note</strong> that the same word in the dictionary may be reused multiple times in the segmentation.</p>`,
  tags: ["Array", "Hash Table", "String", "Dynamic Programming", "Trie", "Memoization"],
  constraints: [
    '<code>1 <= s.length <= 300</code>',
    '<code>1 <= wordDict.length <= 1000</code>',
    '<code>1 <= wordDict[i].length <= 20</code>',
    '<code>s</code> and <code>wordDict[i]</code> consist of only lowercase English letters.',
    'All the strings of <code>wordDict</code> are <strong>unique</strong>.',
  ],
  variables,
  groups,
  testCases,
  generateSteps,
  code, // Reference the imported code string
  visualizers: [
    {
      name: 'DP Segmentation',
      default: true,
      description: 'Visualization of DP table for string segmentation',
      id: 'dp-segmentation',
      elements: [
        { component: 'String', props: { name: 's', label: 'Input String' } },
        { component: 'Array', props: { name: 'dp', label: 'DP Table (Can Segment up to index i?)' } },
        { component: 'Set', props: { name: 'wordDictSet', label: 'Word Dictionary' } },
        // Add values/groups to show current indices and substring
        { component: 'Value', props: { name: 'i', label: 'Outer Index (i)' } },
        { component: 'Value', props: { name: 'j', label: 'Inner Index (j)' } },
        { component: 'Value', props: { name: 'substring', label: 'Current Substring s[j..i-1]' } },
        { component: 'Value', props: { name: 'result', label: 'Final Result' } },
      ],
    },
  ],
  difficulty: 'Medium',
  category: 'Free',
  emoji: '📖',
};
