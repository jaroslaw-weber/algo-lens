import { VariableMetadata } from "@algolens/core/src/types";

export const variables: VariableMetadata[] = [
  {
    name: "matrix",
    label: "Matrix",
    description: "The input matrix.",
    emoji: "🔢",
  },
  {
    name: "result",
    label: "Result Array",
    description: "The array storing elements in spiral order.",
    emoji: "✅",
  },
  {
    name: "top",
    label: "Top Boundary",
    description: "The current top row boundary.",
    emoji: "⬆️",
  },
  {
    name: "bottom",
    label: "Bottom Boundary",
    description: "The current bottom row boundary.",
    emoji: "⬇️",
  },
  {
    name: "left",
    label: "Left Boundary",
    description: "The current left column boundary.",
    emoji: "⬅️",
  },
  {
    name: "right",
    label: "Right Boundary",
    description: "The current right column boundary.",
    emoji: "➡️",
  },
  {
    name: "m",
    label: "Rows (m)",
    description: "Number of rows in the matrix.",
    emoji: "📏",
  },
  {
    name: "n",
    label: "Columns (n)",
    description: "Number of columns in the matrix.",
    emoji: "📏",
  },
  {
    name: "i",
    label: "Row Index",
    description: "Current row index during traversal.",
    emoji: "📍",
  },
  {
    name: "j",
    label: "Column Index",
    description: "Current column index during traversal.",
    emoji: "📍",
  },
];
