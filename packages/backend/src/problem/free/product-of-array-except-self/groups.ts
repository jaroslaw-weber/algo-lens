import { VariableGroup } from 'algo-lens-core';

export const groups: VariableGroup[] = [
  {
    id: 'input',
    label: 'Input',
    variables: ['nums'],
  },
  {
    id: 'intermediate',
    label: 'Intermediate Arrays',
    variables: ['productsLeft', 'productsRight'],
  },
  {
    id: 'output',
    label: 'Output',
    variables: ['output'],
  },
];
