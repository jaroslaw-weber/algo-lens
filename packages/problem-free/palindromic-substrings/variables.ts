import { VariableMetadata } from "algo-lens-core/src/types";


export const variables: VariableMetadata[] = [
  {
    name: "s",
    description: "The input string.",
    emoji: "🔡",
  },
  {
    name: "count",
    description: "The total number of palindromic substrings found.",
    emoji: "🔢",
  },
  {
    name: "left",
    description: "Left pointer for expanding around center.",
    emoji: "👈",
  },
  {
    name: "right",
    description: "Right pointer for expanding around center.",
    emoji: "👉",
  },
  {
    name: "substring",
    label: "Substring",

    description:
      "The substring currently being checked for palindrome property.",
    emoji: "✂️",
  },
];
