import { VariableMetadata } from "algo-lens-core/src/types";


export const variables: VariableMetadata[] = [
  {
    name: "s",
    label: "String S",
    description: "The main string to search within.",
    emoji: "📝",
  },
  {
    name: "t",
    label: "String T",
    description:
      "The target string whose characters must be included in the window.",
    emoji: "🎯",
  },
  {
    name: "windowStart",
    label: "Window Start",
    description: "The starting index of the current sliding window.",
    emoji: "➡️",
  },
  {
    name: "windowEnd",
    label: "Window End",
    description: "The ending index of the current sliding window.",
    emoji: "⬅️",
  },
  {
    name: "minLen",
    label: "Minimum Length",
    description: "The length of the smallest valid window found so far.",
    emoji: "📏",
  },
  {
    name: "minWindow",
    label: "Minimum Window",
    description: "The actual minimum window substring found.",
    emoji: "🪟",
  },
  {
    name: "tCharCount",
    label: "T Character Count",
    description:
      "A hash map storing the required character counts from string T.",
    emoji: "📊",
  },
  {
    name: "windowCharCount",
    label: "Window Character Count",
    description:
      "A hash map storing the character counts within the current window.",
    emoji: "📈",
  },
  {
    name: "matchedChars",
    label: "Matched Characters",
    description:
      "The number of characters in T (with duplicates) that are currently matched in the window.",
    emoji: "✅",
  },
];
