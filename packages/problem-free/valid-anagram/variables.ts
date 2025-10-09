import { VariableMetadata } from "@algolens/core/src/types";

export const variables: VariableMetadata[] = [
  {
    name: "s",
    label: "String s",
    description: "The first input string.",
    emoji: "🅰️",
  },
  {
    name: "t",
    label: "String t",
    description: "The second input string.",
    emoji: "🅱️",
  },
  {
    name: "sCharCounts",
    label: "s Character Counts",
    description:
      "A hash map storing the frequency of each character in string s.",
    emoji: "🔢",
  },
  {
    name: "tCharCounts",
    label: "t Character Counts",
    description:
      "A hash map storing the frequency of each character in string t.",
    emoji: "🔢",
  },
  {
    name: "char",
    label: "Current Character",
    description: "The character currently being processed during iteration.",
    emoji: "🔠",
  },
  {
    name: "result",
    label: "Is Anagram?",
    description: "The final boolean result indicating if t is an anagram of s.",
    emoji: "✅",
  },
];
