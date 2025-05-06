import { TestCase } from "algo-lens-core";
import { WordBreakInput } from "./types"; // Assuming types.ts defines this

// Define WordBreakInput if not defined in types.ts
// interface WordBreakInput { s: string; wordDict: string[]; }

// Added second generic argument for Output type (boolean)
export const testcases: TestCase<WordBreakInput, boolean>[] = [
  { input: { s: "leetcode", wordDict: ["leet", "code"] }, expected: true },
  { input: { s: "applepenapple", wordDict: ["apple", "pen"] }, expected: true },
  { input: { s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"] }, expected: false },
  { input: { s: "aaaaaaa", wordDict: ["aaaa", "aaa"] }, expected: true },
  { input: { s: "a", wordDict: ["b"] }, expected: false }, // Added edge case
];
