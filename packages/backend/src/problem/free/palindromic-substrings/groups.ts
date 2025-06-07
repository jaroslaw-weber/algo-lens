import { GroupMetadata } from "algo-lens-core";

export const groups: GroupMetadata[] = [
  {
    name: "currentSubstring",
    label: "Current Substring",
    description:
      "The substring currently being examined for palindrome property.",
    emoji: "🔍",
  },
  {
    name: "palindromeCount",
    label: "Palindrome Count",
    description: "The total number of palindromic substrings found so far.",
    emoji: "🔢",
  },
];
