import { VariableMetaData } from '@algo-lens/problem-template';

export const variables: VariableMetaData = {
  // Represents the entire list structure for visualization
  listState: { label: 'Linked List', type: 'LINKED_LIST', },
  // Pointers used in the iteration
  prev: { label: 'Previous Pointer', type: 'NODE_POINTER', listVariable: 'listState' }, // Link to the list visualization
  current: { label: 'Current Pointer', type: 'NODE_POINTER', listVariable: 'listState' }, // Link to the list visualization
  next: { label: 'Next Pointer (Temp)', type: 'NODE_POINTER', listVariable: 'listState' }, // Link to the list visualization
};
