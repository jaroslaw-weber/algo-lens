import { GroupMetadata } from "algo-lens-core/src/types";

export const groups: GroupMetadata[] = [
  {
    name: "input",
    label: "Input Dimensions",
    description: "The dimensions (rows and columns) of the grid.",
    emoji: "📏",
  },
  {
    name: "dpTable",
    label: "DP Table",
    description: "The dynamic programming table storing intermediate path counts.",
    emoji: "🔢",
  },
  {
    name: "loopIndices",
    label: "Loop Indices",
    description: "Indices used to iterate through the DP table.",
    emoji: "📍",
  },
];
