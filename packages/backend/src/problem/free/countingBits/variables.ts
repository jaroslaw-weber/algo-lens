import { VariableMetadata } from "algo-lens-core";

export const variableMetadata: VariableMetadata[] = [
  {
    name: "n",
    description: "The input number up to which we count bits.",
    emoji: "🔢",
  },
  {
    name: "result",
    description: "Array storing the count of set bits for each number from 0 to n.",
    emoji: "📊",
  },
  {
    name: "i",
    description: "The current number being processed in the outer loop (from 0 to n).",
    emoji: "🔄",
  },
  {
    name: "num",
    description: "Temporary variable holding the value of 'i' for bit manipulation, or the original 'i' when logging.",
    emoji: "🔍",
  },
  {
    name: "count",
    description: "The count of set bits for the current number 'i'.",
    emoji: "➕",
  },
];
