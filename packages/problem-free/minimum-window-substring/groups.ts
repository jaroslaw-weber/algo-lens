import { GroupMetadata } from "@algolens/core/src/types";

export const groups: GroupMetadata[] = [
  {
    name: "input",
    label: "Input",
    description: "The input strings for the problem.",
    emoji: "📥",
  },
  {
    name: "window_state",
    label: "Window State",
    description: "Variables tracking the current state of the sliding window.",
    emoji: "🔍",
  },
  {
    name: "result",
    label: "Result",
    description: "Variables storing the minimum window found and its length.",
    emoji: "🏆",
  },
];
