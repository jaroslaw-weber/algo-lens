import { GroupMetadata } from "algo-lens-core/src/types";


export const groups: GroupMetadata[] = [
  {
    name: "input",
    label: "Input",
    description: "The input string for the problem.",
    emoji: "📝",
  },
  {
    name: "pointers",
    label: "Pointers",
    description: "The i and j pointers of the sliding window.",
    emoji: "📍",
  },
  {
    name: "charSet",
    label: "Character Set",
    description: "The set of unique characters in the current window.",
    emoji: "🔠",
  },
  {
    name: "result",
    label: "Result",
    description: "The maximum length of the substring found.",
    emoji: "🏆",
  },
];
