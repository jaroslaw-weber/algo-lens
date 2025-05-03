import { GroupMetaData } from '@algo-lens/problem-template';

export const groups: GroupMetaData = [
  {
    id: 'dp-loops',
    title: 'DP Calculation Loops',
    type: 'SIMPLE', // Grouping indices and substring
    variables: ['i', 'j', 'substring'],
  },
   {
    id: 'dp-state',
    title: 'DP State',
    type: 'ARRAY', // Grouping DP array and dictionary
    variables: ['dp', 'wordDictSet'],
  },
];
