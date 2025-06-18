import { VariableMetadata } from "algo-lens-core/src/types";
 // Adjust import path if necessary

export const variables: VariableMetadata[] = [
  {
    name: 'heights', // Changed from label
    description: 'Input grid of heights', // Added description
    emoji: '🗺️', // Added emoji
    // type: 'integer[][]' // Removed type
  },
  {
    name: 'result', // Changed from label
    description: 'Cells that can reach both oceans', // Added description
    emoji: '✅', // Added emoji
    // type: 'integer[][]' // Removed type
  },
  {
    name: 'pacificReachable', // Added metadata for this variable used in steps
    description: 'Cells reachable from the Pacific Ocean',
    emoji: '🟦',
  },
  {
    name: 'atlanticReachable', // Added metadata for this variable used in steps
    description: 'Cells reachable from the Atlantic Ocean',
    emoji: '🟥',
  },
  {
    name: 'row', // Added metadata for this variable used in steps
    description: 'Current row during traversal',
    emoji: '↔️',
  },
  {
    name: 'col', // Added metadata for this variable used in steps
    description: 'Current column during traversal',
    emoji: '↕️',
  },
];
