import { VariableMetadata } from "algo-lens-core/src/types";


export const variables: VariableMetadata[] = [
  {
    name: "n",
    label: "n",
    description: "The target step number.",
    emoji: "🎯",
  },
  {
    name: "dp",
    label: "dp",
    description:
      "Dynamic programming array storing the number of ways to reach each step.",
    emoji: "🔢",
  },
  {
    name: "i",
    label: "i",
    description: "Loop counter for iterating through steps.",
    emoji: "🔄",
  },
  {
    name: "result",
    label: "result",
    description: "The total number of ways to reach the nth step.",
    emoji: "🏁",
  },
];
