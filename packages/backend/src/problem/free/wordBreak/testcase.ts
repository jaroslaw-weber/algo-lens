import type { WordBreakInput } from './types';

export const testCases: { input: WordBreakInput; output: boolean }[] = [
  // LeetCode Example 1
  {
    input: { s: "leetcode", wordDict: ["leet", "code"] },
    output: true,
  },
  // LeetCode Example 2
  {
    input: { s: "applepenapple", wordDict: ["apple", "pen"] },
    output: true,
  },
  // LeetCode Example 3
  {
    input: { s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"] },
    output: false,
  },
  // Word reused
  {
    input: { s: "aaaaaaa", wordDict: ["a", "aa", "aaa"] },
    output: true,
  },
  // Empty string (should technically work based on dp[0]=true, but constraints say s.length >= 1)
  // {
  //   input: { s: "", wordDict: ["a"] },
  //   output: true,
  // },
  // String not breakable
  {
    input: { s: "abcdef", wordDict: ["abc", "defg"] },
    output: false,
  },
  // Dictionary empty
  {
    input: { s: "hello", wordDict: [] },
    output: false,
  },
   // Long string, simple dictionary
   {
     input: { s: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab", wordDict: ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"] },
     output: false,
   },
   // Long string, breakable
   {
     input: { s: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", wordDict: ["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"] },
     output: true,
   },
];
