import {
  VariableMetadata,
  ArrayVariable,
  NumberVariable,
} from "algo-lens-core";

/**
 * Metadata for the variables used in the Number of Islands visualizer.
 * This defines the type, label, and group association for each variable tracked during the algorithm's execution.
 */
export const variables: { [key: string]: VariableMetadata } = {
  grid: {
    type: ArrayVariable<string[][]>, // Assuming grid is string[][], adjust if different
    label: "Grid",
    group: "grid",
    description: "The 2D grid representing land ('1') and water ('0'). Visited land cells are marked.",
    emoji: "🗺️",
  },
  currentRow: {
    type: NumberVariable,
    label: "Current Row",
    group: "traversal",
    description: "The row index of the cell currently being processed in the main loop.",
    emoji: "➡️",
  },
  currentCol: {
    type: NumberVariable,
    label: "Current Column",
    group: "traversal",
    description: "The column index of the cell currently being processed in the main loop.",
    emoji: "⬇️",
  },
  count: {
    type: NumberVariable,
    label: "Islands Found",
    group: "islandCount",
    description: "The total count of islands discovered so far.",
    emoji: "🏝️",
  },
};
