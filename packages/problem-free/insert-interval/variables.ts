import { VariableMetadata } from "algo-lens-core/src/types";


export const variables: VariableMetadata[] = [
  {
    name: "intervals",
    label: "intervals",
    description: "The initial sorted array of intervals.",
    emoji: "📊",
  },
  {
    name: "newInterval",
    label: "newInterval",
    description: "The interval to be inserted and potentially merged.",
    emoji: "➕",
  },
  {
    name: "result",
    label: "result",
    description: "The final array of merged intervals.",
    emoji: "🏁",
  },
  {
    name: "i",
    label: "i",
    description: "Index for iterating through the original intervals array.",
    emoji: "🔢",
  },
  {
    name: "currentInterval", // To represent intervals[i] during loops
    label: "currentInterval",
    description: "The interval currently being processed from the input array.",
    emoji: "👀",
  },
];
