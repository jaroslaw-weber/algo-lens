import { VariableMetadata } from "@algolens/core/src/types";

export const variables: VariableMetadata[] = [
  {
    name: "intervals",
    label: "Intervals",
    description: "The array of meeting time intervals.",
    emoji: "📅",
  },
  {
    name: "currentInterval",
    label: "Current Interval",
    description: "The current interval being examined.",
    emoji: "➡️",
  },
  {
    name: "sortedIntervals",
    label: "Sorted Intervals",
    description: "The intervals array sorted by start time.",
    emoji: "✅",
  },
];
