import { GroupMetadata } from "algo-lens-core";

export const groups: GroupMetadata[] = [
  {
    name: 'input',
    label: 'Input',
    variables: ['nums'],
  },
  {
    name: 'intermediate',
    label: 'Intermediate Arrays',
    variables: ['productsLeft', 'productsRight'],
  },
  {
    name: 'output',
    label: 'Output',
    variables: ['output'],
  },
];
