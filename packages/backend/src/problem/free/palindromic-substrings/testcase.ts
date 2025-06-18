import { ProblemState, TestCase } from "algo-lens-core/src/types";

import { PalindromicSubstringsInput } from "./types";

export const testcases: TestCase<PalindromicSubstringsInput, ProblemState>[] = [
  {
    name: "Racecar",
    description: "A classic palindrome.",
    input: "racecar",
    expected: 10,
    isDefault: true,
  },
  {
    name: "Level",
    description: "Another simple palindrome.",
    input: "level",
    expected: 7,
  },
  {
    name: "Madam",
    description: "A common palindrome.",
    input: "madam",
    expected: 7,
  },
  {
    name: "Aabbaa",
    description: "Contains multiple palindromic substrings.",
    input: "aabbaa",
    expected: 11,
  },
  {
    name: "Google",
    description: "Contains 'oo' and 'goog'.",
    input: "google",
    expected: 8,
  },
  {
    name: "Banana",
    description: "Contains 'ana' and 'anana'.",
    input: "banana",
    expected: 10,
  },
];
