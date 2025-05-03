import { GroupMetaData } from '@algo-lens/problem-template';

export const groups: GroupMetaData = [
  {
    id: 'initialization',
    title: 'DP Table Initialization',
    type: 'ARRAY_2D', // Focus on DP table during init
    variables: ['dp', 'r', 'c'], // Include indices used
  },
  {
    id: 'dp-calculation',
    title: 'DP Calculation',
    type: 'ARRAY_2D', // Focus on DP table during calculation
    variables: ['dp', 'r', 'c'], // Include indices used
  },
  {
    id: 'result',
    title: 'Result',
    type: 'SIMPLE',
    variables: ['result', 'm', 'n'],
  },
];
