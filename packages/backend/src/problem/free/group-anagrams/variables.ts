import { VariableMetadata } from "algo-lens-core/src/types";


export const variables: VariableMetadata[] = [
  {
    name: "strs",
    label: "Input Strings",
    description: "The input array of strings.",
    emoji: "📚",
  },
  {
    name: "str",
    label: "Current String",
    description: "The string currently being processed from the input array.",
    emoji: "📝",
  },
  {
    name: "sortedStr",
    label: "Sorted String",
    description:
      "The sorted version of the current string, used as a key in the anagram map.",
    emoji: "🔤",
  },
  {
    name: "anagramMap",
    label: "Anagram Map",
    description:
      "A hash map where keys are sorted strings and values are arrays of their corresponding anagrams.",
    emoji: "🗺️",
  },
  {
    name: "result",
    label: "Grouped Anagrams",
    description:
      "The final list of arrays, where each inner array contains a group of anagrams.",
    emoji: "✅",
  },
];
