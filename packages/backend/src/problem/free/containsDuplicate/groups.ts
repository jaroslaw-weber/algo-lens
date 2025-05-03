import { GroupMetaData } from '@algo-lens/problem-template';

export const groups: GroupMetaData = [
  {
    id: 'loop-check',
    title: 'Duplicate Check Loop',
    type: 'SIMPLE', // Grouping simple index and current number
    variables: ['i', 'num'],
  },
  {
    id: 'state',
    title: 'State',
    type: 'SET', // Grouping the set and result
    variables: ['seenSet', 'result'],
  },
];
