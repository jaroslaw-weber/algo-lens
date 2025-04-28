import { VariableMetadata } from "algo-lens-core";

export const variableMetadata: VariableMetadata[] = [
  {
    name: "n",
    label: "n",
    description: "The target step number.",
    emoji: "🎯",
    group: "input",
  },
  {
    name: "dp",
    label: "dp",
    description: "Dynamic programming array storing the number of ways to reach each step.",
    emoji: "🔢",
    group: "computation",
  },
  {
    name: "i",
    label: "i",
    description: "Loop counter for iterating through steps.",
    emoji: "🔄",
    group: "computation",
  },
  {
    name: "result",
    label: "result",
    description: "The total number of ways to reach the nth step.",
    emoji: "🏁",
    group: "computation",
  },
];
