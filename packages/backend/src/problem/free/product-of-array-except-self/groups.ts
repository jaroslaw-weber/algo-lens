import { GroupMetaData } from '@algo-lens/problem-template';

export const groups: GroupMetaData = [
  {
    id: 'prefix-pass',
    title: 'Prefix Product Calculation',
    type: 'ARRAY', // Grouping arrays related to prefix calculation
    variables: ['nums', 'prefix', 'i'],
  },
  {
    id: 'suffix-pass',
    title: 'Suffix Product Calculation',
    type: 'ARRAY', // Grouping arrays related to suffix calculation
    variables: ['nums', 'suffix', 'i'],
  },
  {
    id: 'final-result',
    title: 'Final Result Calculation',
    type: 'ARRAY', // Grouping arrays related to the final result
    variables: ['prefix', 'suffix', 'result', 'i'],
  },
];
