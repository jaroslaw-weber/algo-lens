import { ProblemState, TestCase } from "algo-lens-core";
import { PalindromicSubstringsInput } from "./types";

export const testcases: TestCase<PalindromicSubstringsInput, ProblemState>[] = [
  {
    name: "Example 1",
    description: "String with multiple palindromic substrings.",
    input: "abc",
    expected: 3, // "a", "b", "c"
    isDefault: true,
  },
  {
    name: "Example 2",
    description: "String with overlapping palindromes.",
    input: "aaa",
    expected: 6, // "a", "a", "a", "aa", "aa", "aaa"
  },
  {
    name: "Single Character",
    description: "A single character string.",
    input: "a",
    expected: 1, // "a"
  },
  {
    name: "Empty String",
    description: "An empty string should have 0 palindromic substrings.",
    input: "",
    expected: 0,
  },
  {
    name: "Longer String",
    description: "A longer string with various palindromes.",
    input: "abccba",
    expected: 9, // "a", "b", "c", "c", "b", "a", "cc", "bccb", "abccba"
  },
];
