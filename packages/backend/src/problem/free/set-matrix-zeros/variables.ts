import { VariableMetadata } from "algo-lens-core";

export const variables: VariableMetadata[] = [
  {
    name: "matrix",
    description: "The input matrix.",
    emoji: "🔢",
  },
  {
    name: "rows",
    description: "The number of rows in the matrix.",
    emoji: "↕️",
  },
  {
    name: "cols",
    description: "The number of columns in the matrix.",
    emoji: "↔️",
  },
  {
    name: "firstRowHasZero",
    description: "Flag indicating if the first row contains a zero.",
    emoji: "🚩",
  },
  {
    name: "firstColHasZero",
    description: "Flag indicating if the first column contains a zero.",
    emoji: "🚩",
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
];
