import { TestCase } from "algo-lens-core";

// Define the input type based on the function signature in code.ts
interface WordBreakInput {
  s: string;
  wordDict: string[];
}

// Define the output type based on the expected return value of the core logic
type WordBreakOutput = boolean;

// Define the test cases for the wordBreak function
export const testcases: Array<TestCase<WordBreakInput, WordBreakOutput>> = [
  {
    input: {
      s: "leetcode",
      wordDict: ["leet", "code"],
    },
    expected: true,
    description: "String can be segmented into two words"
  },
  {
    input: {
      s: "applepenapple",
      wordDict: ["apple", "pen"],
    },
    expected: true,
    description: "String with repeating words in dictionary"
  },
  {
    input: {
      s: "catsandog",
      wordDict: ["cats", "dog", "sand", "and", "cat"],
    },
    expected: false,
    description: "String cannot be fully segmented"
  },
   {
    input: {
      s: "a",
      wordDict: ["a"],
    },
    expected: true,
    description: "Single character string and dictionary"
   },
   {
     input: {
       s: "aaaaaaa",
       wordDict: ["aaaa", "aaa"]
     },
     expected: true,
     description: "Multiple ways to segment"
   },
   {
     input: {
       s: "ab",
       wordDict: ["a", "b"]
     },
     expected: true,
     description: "Simple two-character segmentation"
   }
];
