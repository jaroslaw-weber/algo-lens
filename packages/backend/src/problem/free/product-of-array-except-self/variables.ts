import { VariableMetaData } from '@algo-lens/problem-template';

export const variables: VariableMetaData = {
  nums: { label: 'Input Array', type: 'ARRAY', },
  result: { label: 'Result Array', type: 'ARRAY', },
  prefix: { label: 'Prefix Products (Left)', type: 'ARRAY', },
  suffix: { label: 'Suffix Products (Right)', type: 'ARRAY', },
  i: { label: 'Loop Index', type: 'SIMPLE' },
  // Potentially add 'current_prefix_product' or 'current_suffix_product' if needed for visualization
};
