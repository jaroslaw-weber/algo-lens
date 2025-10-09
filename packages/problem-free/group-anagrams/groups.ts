import { GroupMetadata } from "@algolens/core/src/types";

export const groups: GroupMetadata[] = [
  {
    name: "input",
    label: "Input",
    description: "The input array of strings `strs`.",
    emoji: "📥",
  },
  {
    name: "anagram_map",
    label: "Anagram Map",
    description:
      "A hash map to store sorted strings as keys and lists of their anagrams as values.",
    emoji: "🗺️",
  },
  {
    name: "iteration",
    label: "Iteration",
    description: "Variables used during the iteration through the input array.",
    emoji: "🔄",
  },
  {
    name: "result",
    label: "Result",
    description: "The final list of grouped anagrams.",
    emoji: "✅",
  },
];
