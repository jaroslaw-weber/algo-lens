import { VariableMetadata } from "algo-lens-core";

export const variables: VariableMetadata[] = [
  {
    name: "grid",
    label: "grid",
    description:
      "The input 2D grid representing land ('1') and water ('0'). Also modified during DFS/BFS.",
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
    name: "result",
    label: "result",
    description: "The final count of islands.",
    emoji: "🏝️", // Island emoji
  },
];
