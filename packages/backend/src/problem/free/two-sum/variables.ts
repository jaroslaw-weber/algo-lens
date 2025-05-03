import { VariableMetaData } from '@algo-lens/problem-template';

export const variables: VariableMetaData = {
  nums: { label: 'Input Array', type: 'ARRAY', },
  target: { label: 'Target Sum', type: 'SIMPLE', },
  seen: { label: 'Seen Numbers (Value -> Index)', type: 'HASHMAP', },
  result: { label: 'Result Indices', type: 'ARRAY', },
  i: { label: 'Current Index', type: 'SIMPLE' },
  complement: { label: 'Complement Needed', type: 'SIMPLE' },
};
