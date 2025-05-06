import { TestCase, ProblemState } from "algo-lens-core"; // Added ProblemState import
import { WordBreakInput } from "./types"; // Keep this import

// Define WordBreakInput if not defined in types.ts - This comment is outdated, types.ts exists
// interface WordBreakInput { s: string; wordDict: string[]; }

// Corrected TestCase type annotation with Input and State types
export const testcases: TestCase<WordBreakInput, ProblemState>[] = [
  { input: { s: "leetcode", wordDict: ["leet", "code"] }, expected: true },
  { input: { s: "applepenapple", wordDict: ["apple", "pen"] }, expected: true },
  { input: { s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"] }, expected: false },
  { input: { s: "aaaaaaa", wordDict: ["aaaa", "aaa"] }, expected: true },
  { input: { s: "a", wordDict: ["b"] }, expected: false }, // Added edge case
];
