import { VariableMetaData } from '@algo-lens/problem-template';

export const variables: VariableMetaData = {
  s: { label: 'Input String', type: 'STRING', },
  wordDictSet: { label: 'Word Dictionary', type: 'SET', }, // Using SET type if available
  dp: { label: 'DP Table (Can Segment s[0..i-1]?)', type: 'ARRAY', itemType: 'BOOLEAN'}, // Array of booleans
  i: { label: 'Outer Index (End of Substring)', type: 'SIMPLE', },
  j: { label: 'Inner Index (Start of Substring)', type: 'SIMPLE', },
  substring: { label: 'Current Substring s[j..i-1]', type: 'STRING', },
  result: { label: 'Final Result (Can Segment s?)', type: 'BOOLEAN', },
};
