import { GroupMetaData } from '@algo-lens/problem-template';

export const groups: GroupMetaData = [
  {
    id: 'initial-check',
    title: 'Initial Check (First Row/Col)',
    type: 'BOOLEAN', // Grouping the boolean flags
    variables: ['firstRowZero', 'firstColZero', 'r', 'c'], // Include indices used
  },
  {
    id: 'marking-pass',
    title: 'Marking Pass (Using First Row/Col)',
    type: 'ARRAY_2D', // Focus on matrix changes during marking
    variables: ['matrix', 'r', 'c'],
  },
   {
    id: 'setting-pass',
    title: 'Setting Zeros Pass (Based on Markers)',
    type: 'ARRAY_2D', // Focus on matrix changes during setting
    variables: ['matrix', 'r', 'c'],
  },
   {
    id: 'cleanup-pass',
    title: 'Cleanup Pass (First Row/Col)',
    type: 'ARRAY_2D', // Focus on final matrix changes
    variables: ['matrix', 'firstRowZero', 'firstColZero', 'r', 'c'],
  },
];
