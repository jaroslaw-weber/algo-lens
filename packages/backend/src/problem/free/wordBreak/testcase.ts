import { defineTestcase } from "@problem/types/testcase";
import { WordBreakInput } from "./types"; // Assuming types.ts defines this

export const testcases = [
  defineTestcase<WordBreakInput>({
    title: "Test Case 1: leetcode",
    input: { s: "leetcode", wordDict: ["leet", "code"] },
    output: true,
  }),
  defineTestcase<WordBreakInput>({
    title: "Test Case 2: applepenapple",
    input: { s: "applepenapple", wordDict: ["apple", "pen"] },
    output: true,
  }),
  defineTestcase<WordBreakInput>({
    title: "Test Case 3: catsandog",
    input: { s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"] },
    output: false,
  }),
  defineTestcase<WordBreakInput>({
    title: "Test Case 4: cars",
    input: { s: "cars", wordDict: ["car", "ca", "rs"] },
    output: true,
  }),
  defineTestcase<WordBreakInput>({
    title: "Test Case 5: Empty string",
    input: { s: "", wordDict: ["a", "b"] },
    output: true, // Empty string can always be segmented (base case)
  }),
  defineTestcase<WordBreakInput>({
    title: "Test Case 6: Empty dictionary",
    input: { s: "something", wordDict: [] },
    output: false,
  }),
];
