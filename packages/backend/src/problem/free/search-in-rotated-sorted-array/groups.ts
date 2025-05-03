import { GroupMetaData } from '@algo-lens/problem-template';

export const groups: GroupMetaData = [
  {
    id: 'pointers',
    title: 'Binary Search Pointers',
    type: 'SIMPLE', // Grouping simple pointer indices
    variables: ['left', 'right', 'mid'],
  },
  {
    id: 'search-state',
    title: 'Search State',
    type: 'SIMPLE',
    variables: ['target', 'result'],
  },
];
