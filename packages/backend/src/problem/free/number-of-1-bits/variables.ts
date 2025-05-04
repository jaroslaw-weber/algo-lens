import { VariableMetadata } from "algo-lens-core";

export const variables: VariableMetadata[] = [
  {
    name: "n",
    label: "n",
    description: "The input unsigned integer.",
    emoji: "🔢",
  },
  {
    name: "count",
    label: "count",
    description: "The running count of set bits (1s) found.",
    emoji: "➕",
  },
  {
    name: "current_n", // Optional, but can be useful for visualization
    label: "current_n",
    description: "The current value of the number being processed in the loop.",
    emoji: "🔍",
  },
  {
    name: "count", // The actual variable name holding the result
    label: "result", // The label expected by the test framework
    description: "The final count of set bits.",
    emoji: "✅",
  },
];
