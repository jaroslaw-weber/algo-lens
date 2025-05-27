import { VariableMetadata } from "algo-lens-core";

export const variables: VariableMetadata[] = [
  {
    name: "s",
    label: "Input String",
    emoji: "📝",
    description: "The input string as an array of characters.",
  },
  {
    name: "i",
    label: "Left Pointer",
    emoji: "👈",
    description: "The left pointer of the sliding window.",
  },
  {
    name: "j",
    label: "Right Pointer",
    emoji: "👉",
    description: "The right pointer of the sliding window.",
  },
  {
    name: "charSet",
    label: "Character Set",
    emoji: "🔠",
    description: "The set of unique characters in the current window.",
  },
  {
    name: "maxLength",
    label: "Max Length",
    emoji: "🏆",
    description: "The maximum length of a substring found so far.",
  },
];
