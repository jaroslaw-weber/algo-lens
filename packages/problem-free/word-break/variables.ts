import { VariableMetadata } from "@algolens/core/src/types";

export const variables: VariableMetadata[] = [
  {
    name: "s",
    label: "s",
    description: "The input string to be segmented.",
    emoji: "📄",
  },
  {
    name: "wordDict",
    label: "wordDict",
    description: "A dictionary of words to check against.",
    emoji: "📚",
  },
  {
    name: "dp",
    label: "dp",
    description:
      "A boolean array where dp[i] is true if the first i characters of 's' can be segmented into dictionary words.",
    emoji: "🤔",
  },
  {
    name: "result",
    label: "result",
    description:
      "The final result indicating if the input string can be segmented.",
    emoji: "✅",
  },
  {
    name: "end",
    label: "end",
    description:
      "The end index (exclusive) of the current prefix being examined.",
    emoji: "🔢",
  },
  {
    name: "start",
    label: "start",
    description:
      "The start index (inclusive) of the potential word segment (suffix).",
    emoji: "🔢",
  },
  {
    name: "wordSet",
    label: "wordSet",
    description:
      "A Set created from the word dictionary for efficient lookups.",
    emoji: "🧩",
  },
  {
    name: "suffix",
    label: "suffix",
    description: "The current substring being checked against the dictionary.",
    emoji: "✂️",
  },
  {
    name: "canSegmentPrefix",
    label: "canSegmentPrefix",
    description:
      "Indicates if the prefix of the string ending before the current suffix can be segmented.",
    emoji: "❓",
  },
  {
    name: "isWordInDict",
    label: "isWordInDict",
    description:
      "Indicates if the current suffix is found in the word dictionary.",
    emoji: "✅",
  },
];
