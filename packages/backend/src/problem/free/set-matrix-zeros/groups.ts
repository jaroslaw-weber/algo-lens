import { GroupMetadata } from "algo-lens-core";

export const groups: GroupMetadata[] = [
  {
    name: "matrixInfo",
    label: "Matrix Info",
    description: "The matrix dimensions and content.",
    emoji: "📐",
  },
  {
    name: "zeroFlags",
    label: "Zero Flags",
    description: "Flags indicating if the first row/column contains zeros.",
    emoji: "🚩",
  },
  {
    name: "loopIndices",
    label: "Loop Indices",
    description: "Indices used for iterating through the matrix.",
    emoji: "📍",
  },
];
