import { VariableMetadata } from "algo-lens-core";

export const variableMetadata: VariableMetadata[] = [
  {
    name: "grid",
    label: "grid",
    description: "The input 2D grid representing land ('1') and water ('0'). Also modified during DFS/BFS.",
    emoji: "🗺️", // Map emoji
  },
  {
    name: "rows",
    label: "rows",
    description: "The total number of rows in the grid.",
    emoji: "↕️",
  },
  {
    name: "cols",
    label: "cols",
    description: "The total number of columns in the grid.",
    emoji: "↔️",
  },
  {
    name: "row",
    label: "row",
    description: "The current row index during the main grid traversal.",
    emoji: "➡️",
  },
  {
    name: "col",
    label: "col",
    description: "The current column index during the main grid traversal.",
    emoji: "⬇️",
  },
  {
    name: "islandCount",
    label: "islandCount",
    description: "The total number of islands found.",
    emoji: "🏝️", // Island emoji
  },
  {
    name: "dfs_row", // Specific to DFS/BFS helper function if visualized
    label: "dfs_row",
    description: "The row index currently being explored in DFS/BFS.",
    emoji: "🔍",
  },
  {
    name: "dfs_col", // Specific to DFS/BFS helper function if visualized
    label: "dfs_col",
    description: "The column index currently being explored in DFS/BFS.",
    emoji: "🔎",
  },
];
