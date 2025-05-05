import { GroupMetadata } from "algo-lens-core";

export const groups: GroupMetadata[] = [
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
