import { GroupMetaData } from '@algo-lens/problem-template';

export const groups: GroupMetaData = [
  {
    id: 'comparison-state',
    title: 'Current Comparison',
    type: 'NODE_POINTER', // Grouping pointers and result
    variables: ['currentNodeP', 'currentNodeQ', 'comparisonResult'],
  },
];
