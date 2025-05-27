import { TestCase } from "algo-lens-core";
import { WordBreakInput } from "./types"; // Assuming types.ts defines this

// Define WordBreakInput if not defined in types.ts
// interface WordBreakInput { s: string; wordDict: string[]; }

// Added second generic argument for Output type (boolean)
export const testcases = [
  {
    input: { s: "leetcode", wordDict: ["leet", "code"] },
    expected: true,
    description: "Basic case where the string can be segmented.",
  },
  {
    input: { s: "applepenapple", wordDict: ["apple", "pen"] },
    expected: true,
    description: "String can be segmented by repeating words.",
  },
  {
    input: { s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"] },
    expected: false,
    description: "Default test case: string cannot be segmented.",
    isDefault: true,
  },
  {
    input: { s: "aaaaaaa", wordDict: ["aaaa", "aaa"] },
    expected: true,
    description: "String can be segmented with overlapping words.",
  },
  {
    input: { s: "a", wordDict: ["b"] },
    expected: false,
    description: "Single character string and no matching word in dictionary.",
  },
];
