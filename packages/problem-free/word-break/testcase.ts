import { TestCase } from "algo-lens-core/src/types";
import { WordBreakInput } from "./types"; // Assuming types.ts defines this

// Define WordBreakInput if not defined in types.ts
// interface WordBreakInput { s: string; wordDict: string[]; }

// Added second generic argument for Output type (boolean)
export const testcases = [
  {
    name: "Basic Segmentation",
    input: { s: "leetcode", wordDict: ["leet", "code"] },
    expected: true,
    description: "Basic case where the string can be segmented.",
  },
  {
    name: "Repeating Words",
    input: { s: "applepenapple", wordDict: ["apple", "pen"] },
    expected: true,
    description: "String can be segmented by repeating words.",
  },
  {
    name: "Default No Segmentation",
    input: { s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"] },
    expected: false,
    description: "Default test case: string cannot be segmented.",
    isDefault: true,
  },
  {
    name: "Overlapping Words",
    input: { s: "aaaaaaa", wordDict: ["aaaa", "aaa"] },
    expected: true,
    description: "String can be segmented with overlapping words.",
  },
  {
    name: "Single Character No Match",
    input: { s: "a", wordDict: ["b"] },
    expected: false,
    description: "Single character string and no matching word in dictionary.",
  },
];
