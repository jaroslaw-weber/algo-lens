import { Problem, ProblemState, Variable } from "../../types";
import { asArray,  asSimpleValue } from "../../utils";

function canBreak(p: WordBreakInput): ProblemState[] {
  const s: ProblemState[] = [];
  const { s: str, wordDict } = p;
  const n = str.length;
  const dp: boolean[] = new Array(n + 1).fill(false);
  dp[0] = true;  // Empty string can always be segmented.
  s.push({
    variables: [
      ...asSimpleValue({ str}),
      asArray("dp", dp),
    ],
    breakpoint: 1,
  }); //#1

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.includes(str.substring(j, i))) {
        dp[i] = true;
        s.push({
          variables: [
           ... asSimpleValue({ str,i, j, substring: str.substring(j, i) }),
            asArray("dp", dp, i, j),
          ],
          breakpoint: 2,
        }); //#2
        break;
      }
    }
  }

  const result = dp[n];
  s.push({
    variables: [
      ...asSimpleValue({
        str, result,
      }),
      asArray("dp", dp, n),
    ],
    breakpoint: 3,
  }); //#3
  return s;
}

interface WordBreakInput {
  s: string;
  wordDict: string[];
}

const code = `function canBreak(s, wordDict) {
  const n = s.length;
  const dp = new Array(n + 1).fill(false);
  dp[0] = true; 
  //#1
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.includes(s.substring(j, i))) {
        dp[i] = true; 
        //#2
        break;
      }
    }
  }
  const result = dp[n]; 
  //#3
  return result;
}`;

const title = "Word Break";
const getInput = () => ({ s: "leetcode", wordDict: ["leet", "code"] });

export const wordBreakProblem: Problem<WordBreakInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: canBreak,
  id: "word-break",
};
