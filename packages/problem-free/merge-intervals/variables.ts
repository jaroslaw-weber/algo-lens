import { VariableMetadata } from "@algolens/core/src/types";

export const variables: VariableMetadata[] = [
  {
    name: "intervals",
    label: "intervals",
    description: "The input array of intervals (assumed sorted by start time).",
    emoji: "📊",
  },
  {
    name: "merged",
    label: "merged",
    description: "The result array containing the merged intervals.",
    emoji: "🏁",
  },
  {
    name: "i",
    label: "i",
    description: "Index for iterating through the sorted input intervals.",
    emoji: "🔢",
  },
  {
    name: "currentInterval",
    label: "currentInterval",
    description: "The current interval being processed from the sorted input.",
    emoji: "👀",
  },
  {
    name: "lastMerged",
    label: "lastMerged",
    description:
      "The last interval added or updated in the 'merged' result array.",
    emoji: "🔚", // Emoji indicating the last/end item
  },
];
