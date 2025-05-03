import { VariableMetaData } from '@algo-lens/problem-template';

export const variables: VariableMetaData = {
  m: { label: 'Rows (m)', type: 'SIMPLE', },
  n: { label: 'Cols (n)', type: 'SIMPLE', },
  dp: { label: 'DP Table', type: 'ARRAY_2D', },
  r: { label: 'Row Index (i)', type: 'SIMPLE', }, // Using 'r' to match visualizer props potentially
  c: { label: 'Col Index (j)', type: 'SIMPLE', }, // Using 'c' to match visualizer props potentially
  result: { label: 'Final Result', type: 'SIMPLE', }, // The value in dp[m-1][n-1]
};
