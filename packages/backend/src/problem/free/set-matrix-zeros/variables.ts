import { VariableMetaData } from '@algo-lens/problem-template';

export const variables: VariableMetaData = {
  matrix: { label: 'Matrix', type: 'ARRAY_2D', },
  r: { label: 'Row Index (i)', type: 'SIMPLE', }, // Using 'r' to match visualizer props potentially
  c: { label: 'Col Index (j)', type: 'SIMPLE', }, // Using 'c' to match visualizer props potentially
  firstRowZero: { label: 'First Row Has Zero', type: 'BOOLEAN', },
  firstColZero: { label: 'First Col Has Zero', type: 'BOOLEAN', },
};
