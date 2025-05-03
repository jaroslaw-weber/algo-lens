import { VariableMetaData } from '@algo-lens/problem-template';

export const variables: VariableMetaData = {
  nums: { label: 'Input Array', type: 'ARRAY', },
  target: { label: 'Target Value', type: 'SIMPLE', },
  left: { label: 'Left Pointer Index', type: 'SIMPLE', },
  right: { label: 'Right Pointer Index', type: 'SIMPLE', },
  mid: { label: 'Middle Pointer Index', type: 'SIMPLE', },
  result: { label: 'Result Index', type: 'SIMPLE', }, // To store the final index or -1
};
