import { VariableMetadata } from "algo-lens-core";

export const variables: VariableMetadata[] = [
  {
    name: "intervals",
    label: "intervals",
    description: "The input array of intervals (assumed sorted by end time).",
    emoji: "📊",
  },
  {
    name: "count",
    label: "count",
    description: "The count of intervals removed to ensure no overlaps.",
    emoji: "🗑️", // Emoji for removal/count
  },
  {
    name: "prevEnd",
    label: "prevEnd",
    description: "The end time of the last interval kept.",
    emoji: "🔚",
  },
  {
    name: "i",
    label: "i",
    description: "Index for iterating through the sorted intervals.",
    emoji: "🔢",
  },
  {
    name: "currentInterval",
    label: "currentInterval",
    description:
      "The current interval being considered for keeping or removing.",
    emoji: "👀",
  },
];
