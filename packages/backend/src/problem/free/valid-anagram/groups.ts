import { GroupMetadata } from "algo-lens-core";

export const groups: GroupMetadata[] = [
  {
    name: "input",
    label: "Input",
    description: "The input strings s and t.",
    emoji: "📥",
  },
  {
    name: "character_counts",
    label: "Character Counts",
    description: "Hash maps storing character frequencies for s and t.",
    emoji: "📊",
  },
  {
    name: "comparison",
    label: "Comparison",
    description: "Variables used during the comparison of character counts.",
    emoji: "🔍",
  },
  {
    name: "result",
    label: "Result",
    description: "The final boolean result indicating if t is an anagram of s.",
    emoji: "✅",
  },
];
