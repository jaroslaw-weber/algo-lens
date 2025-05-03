import { VariableMetaData } from '@algo-lens/problem-template';

export const variables: VariableMetaData = {
  nums: { label: 'Input Array', type: 'ARRAY', itemType: 'NUMBER' },
  seenSet: { label: 'Seen Numbers', type: 'SET', itemType: 'NUMBER' }, // Using SET type if available
  i: { label: 'Current Index', type: 'SIMPLE', },
  num: { label: 'Current Number (nums[i])', type: 'SIMPLE', },
  result: { label: 'Duplicate Found?', type: 'BOOLEAN', },
};
