import { clone } from "lodash";
import { Problem, ProblemState, Variable } from "../core/types";
import { asArray, asValueGroup, asSimpleValue, asStringArray } from "../core/utils";

function wordBreak(p: WordBreakInput): ProblemState[] {
  const s: ProblemState[] = [];
  const { s: str, wordDict } = p;
  const n = str.length;
  const dp: boolean[] = new Array(n + 1).fill(false);
  dp[0] = true; // Empty string can always be segmented.
  s.push({
    variables: [asStringArray("str", str), asArray("dp", dp)],
    breakpoint: 1,
  }); //#1

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      const word = str.substring(j, i);
      s.push({
        variables: [
          asStringArray("str", str, i - 1, j),
          asValueGroup("loops",{ i, j }, { min: 0, max: n }),
          ...asSimpleValue({ word }),
          asArray("dp", dp, i, j),
        ],
        breakpoint: 2,
      }); //#2
      if (dp[j] && wordDict.includes(word)) {
        dp[i] = true;
        s.push({
          variables: [
            asStringArray("str", str, i - 1, j),
            ...asSimpleValue({  word }),
            asValueGroup("loops",{ i, j }, { min: 0, max: n }),
            asArray("dp", dp, i, j),
          ],
          breakpoint: 3,
        });
        //#3
        break;
      }
    }
  }

  const result = dp[n];
  s.push({
    variables: [
      asStringArray("str", str),
      ...asSimpleValue({
        result,
      }),
      asArray("dp", dp, n),
    ],
    breakpoint: 4,
  }); //#4
  return s;
}

interface WordBreakInput {
  s: string;
  wordDict: string[];
}

const code = `function wordBreak(s, wordDict) {
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true; 
  //#1
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      const word = s.substring(j, i)
      //#2
      if (dp[j] && wordDict.includes(word)) {
        dp[i] = true; 
        //#3
        break;
      }
    }
  }
  const result = dp[n]; 
  //#4
  return result;
}`;

const title = "Word Break";
const getInput = () => ({
  s: "catsandog",
  wordDict: ["cats", "dog", "sand", "and", "cat"],
});

export const wordBreakProblem: Problem<WordBreakInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: wordBreak,
  id: "word-break",
  tested: true,
  tags: ["dynamic programming", "string"],
};
