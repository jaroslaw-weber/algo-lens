import { VariableMetadata } from "algo-lens-core/src/types";


export const variables: VariableMetadata[] = [
  {
    name: "grid",
    label: "grid",
    description:
      "Input 2D grid representing the costs. Also used as the DP table storing minimum path sums.",
    emoji: "🔢", // Using grid emoji
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
    description: "The current row index being processed.",
    emoji: "➡️", // Row iteration often goes right conceptually in loops
  },
  {
    name: "col",
    label: "col",
    description: "The current column index being processed.",
    emoji: "⬇️", // Column iteration often goes down conceptually in loops
  },
  {
    name: "result",
    label: "result",
    description:
      "The minimum path sum from the top-left to the bottom-right corner (grid[rows-1][cols-1]).",
    emoji: "🏁",
  },
];
