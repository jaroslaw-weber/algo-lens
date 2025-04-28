import { VariableMetadata } from "algo-lens-core";

export const variableMetadata: VariableMetadata[] = [
  {
    name: "intervals",
    label: "intervals",
    description: "The initial sorted array of intervals.",
    emoji: "📊",
    group: "input", // Correct group
  },
  {
    name: "newInterval",
    label: "newInterval",
    description: "The interval to be inserted and potentially merged.",
    emoji: "➕",
    group: "input", // Correct group
  },
  {
    name: "result",
    label: "result",
    description: "The final array of merged intervals.",
    emoji: "🏁",
    group: "result_array", // Correct group
  },
  {
    name: "i",
    label: "i",
    description: "Index for iterating through the original intervals array.",
    emoji: "🔢",
    group: "loop_merging", // Correct group
  },
  {
    name: "currentInterval", // To represent intervals[i] during loops
    label: "currentInterval",
    description: "The interval currently being processed from the input array.",
    emoji: "👀",
    group: "loop_merging", // Correct group
  },
];
