import { VariableMetadata } from "algo-lens-core/src/types";


export const variables: VariableMetadata[] = [
  {
    name: "m",
    description: "Number of rows in the grid.",
    emoji: "📏",
  },
  {
    name: "n",
    description: "Number of columns in the grid.",
    emoji: "📏",
  },
  {
    name: "dp",
    description: "The 2D array storing the number of unique paths to each cell.",
    emoji: "🔢",
  },
  {
    name: "i",
    description: "Current row index.",
    emoji: "👇",
  },
  {
    name: "j",
    description: "Current column index.",
    emoji: "👉",
  },
  {
    name: "result",
    description: "The final number of unique paths from top-left to bottom-right.",
    emoji: "✅",
  },
];
