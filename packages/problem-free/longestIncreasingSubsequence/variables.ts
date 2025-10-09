import { VariableMetadata } from "@algolens/core/src/types";

export const variables: VariableMetadata[] = [
  {
    name: "nums",
    label: "nums",
    description: "The input array of numbers.",
    emoji: "🔢",
  },
  {
    name: "dp",
    label: "dp",
    description: "DP array: length of the LIS ending at index i.",
    emoji: "📊",
  },
  {
    name: "i",
    label: "i",
    description: "Outer loop index iterating through the input array.",
    emoji: "➡️",
  },
  {
    name: "j",
    label: "j",
    description: "Inner loop index iterating from 0 up to i-1.",
    emoji: "↪️",
  },
  {
    name: "maxLength",
    label: "maxLength",
    description:
      "The overall maximum length of the longest increasing subsequence found.",
    emoji: "🏆",
  },
];
