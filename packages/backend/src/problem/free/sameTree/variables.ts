import { VariableMetaData } from '@algo-lens/problem-template';

export const variables: VariableMetaData = {
  // Tree structures
  pTree: { label: 'Tree P', type: 'BINARY_TREE', },
  qTree: { label: 'Tree Q', type: 'BINARY_TREE', },
  // Current nodes being compared in the recursion/iteration
  // Using NODE_POINTER assumes the tree visualizer can highlight nodes based on references
  currentNodeP: { label: 'Current Node (P)', type: 'NODE_POINTER', treeVariable: 'pTree' },
  currentNodeQ: { label: 'Current Node (Q)', type: 'NODE_POINTER', treeVariable: 'qTree' },
  // Result of the comparison at the current step or final result
  comparisonResult: { label: 'Node Comparison', type: 'BOOLEAN' }, // For intermediate results
  finalResult: { label: 'Overall Result', type: 'BOOLEAN' }, // For the final true/false
};
