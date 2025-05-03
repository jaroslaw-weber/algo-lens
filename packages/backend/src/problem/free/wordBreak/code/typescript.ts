import { clone } from "lodash"; // May not be needed after refactor
import { Problem, ProblemState, Variable } from "algo-lens-core";
// Assuming visualization helpers handled by StepLoggerV2
// import { asArray, asValueGroup, asSimpleValue, asStringArray } from "../core/utils";

// Input type (will be defined in types.ts)
interface WordBreakInput {
  s: string;
  wordDict: string[];
}

// Core algorithm - DP approach. Breakpoints will be added.
export function wordBreakAlgorithm(s: string, wordDict: string[]): boolean {
  const n = s.length;
  const wordDictSet = new Set(wordDict); // Use Set for O(1) lookups
  // dp[i] means s.substring(0, i) can be segmented.
  const dp: boolean[] = new Array(n + 1).fill(false);
  dp[0] = true; // Base case: empty string

  //#1 Initialize DP array (dp[0] = true) and word dictionary set. Start outer loop.
  for (let i = 1; i <= n; i++) {
     // #2 Start inner loop (j from 0 to i-1).
    for (let j = 0; j < i; j++) {
       // #3 Extract substring s[j..i-1].
      const word = s.substring(j, i);
       // #4 Check if dp[j] is true and substring is in the dictionary.
      if (dp[j] && wordDictSet.has(word)) {
         // #5 Found a valid segmentation ending at i. Set dp[i] = true.
        dp[i] = true;
         // #6 Break inner loop (optimization: no need to check shorter substrings ending at i).
        break;
      }
    }
     // #7 Inner loop finished for index i. Continue outer loop.
  }

  // #8 Outer loop finished. Return dp[n].
  return dp[n];
}


// Old step generation function (for reference)
export function wordBreak_OldSteps(p: WordBreakInput): ProblemState[] {
  const s_steps: ProblemState[] = []; // Renamed to avoid conflict with input 's'
  const { s: str, wordDict } = p; // Renamed input 's' to 'str'
  const n = str.length;
  const dp: boolean[] = new Array(n + 1).fill(false);
  dp[0] = true; // Empty string can always be segmented.
  // Old Logging: s_steps.push({ variables: [asStringArray("str", str), asArray("dp", dp)], breakpoint: 1 }); //#1

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      const word = str.substring(j, i);
      // Old Logging: s_steps.push({ variables: [ asStringArray("str", str, i - 1, j), asValueGroup("loops",{ i, j }, { min: 0, max: n }), ...asSimpleValue({ word }), asArray("dp", dp, i, j), ], breakpoint: 2, }); //#2
      if (dp[j] && wordDict.includes(word)) { // Original used includes, less efficient
        dp[i] = true;
        // Old Logging: s_steps.push({ variables: [ asStringArray("str", str, i - 1, j), ...asSimpleValue({  word }), asValueGroup("loops",{ i, j }, { min: 0, max: n }), asArray("dp", dp, i, j), ], breakpoint: 3, }); //#3
        break;
      }
    }
  }

  const result = dp[n];
  // Old Logging: s_steps.push({ variables: [ asStringArray("str", str), ...asSimpleValue({ result, }), asArray("dp", dp, n), ], breakpoint: 4, }); //#4
  return s_steps;
}

// Code string for display - updated with breakpoints
const code = `function wordBreak(s: string, wordDict: string[]): boolean {
  const n = s.length;
  const wordDictSet = new Set(wordDict);
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;

  //#1 Initialize DP array (dp[0] = true) and word dictionary set. Start outer loop.
  for (let i = 1; i <= n; i++) {
    //#2 Start inner loop (j from 0 to i-1).
    for (let j = 0; j < i; j++) {
      //#3 Extract substring s[j..i-1].
      const word = s.substring(j, i);
      //#4 Check if dp[j] is true (s[0..j-1] is breakable) AND substring s[j..i-1] is in the dictionary.
      if (dp[j] && wordDictSet.has(word)) {
        //#5 Found a valid segmentation ending at i. Set dp[i] = true.
        dp[i] = true;
        //#6 Break inner loop (optimization).
        break;
      }
    }
    //#7 Inner loop finished for index i. Continue outer loop.
  }

  //#8 Outer loop finished. Return dp[n] (indicates if s[0..n-1] is breakable).
  return dp[n];
}`;

// Problem definition will be moved to problem.ts
export const problem: Problem<WordBreakInput /*, ProblemState removed */> = {
  title: "Word Break",
  emoji: '📖',
  code, // Reference the code string defined above
  // func: wordBreak_OldSteps, // func is usually removed, rely on generateSteps
  id: "word-break",
  tags: ["Array", "Hash Table", "String", "Dynamic Programming", "Trie", "Memoization"], // Added relevant tags
};
