import { Problem } from "../../Problem";

function canBreak(p:{s: string, wordDict: string[]}): any[] {
	const { s, wordDict } = p;
  const steps = [];
  const n = s.length;
  const dp: boolean[] = new Array(n + 1).fill(false);
  dp[0] = true;  // Empty string can always be segmented.
  steps.push({ s, dp: dp.slice(), line: 1 });

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.includes(s.substring(j, i))) {
        dp[i] = true;
        steps.push({ i, j, s, dp: dp.slice(), line: 7 });
        break;
      }
    }
  }

  const result = dp[n];
  steps.push({ s, dp, result, line: 12 });
  return steps;
}

interface WordBreakState {
  s: string;
  dp: boolean[];
}

interface WordBreakInput {
  s: string;
  wordDict: string[];
}

const code = `function canBreak(s: string, wordDict: string[]): boolean {
  const n = s.length;
  const dp: boolean[] = new Array(n + 1).fill(false);
  dp[0] = true;
  
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.includes(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  
  return dp[n];
}`;

const title = "Word Break";

const getInput = () => ({ s: "leetcode", wordDict: ["leet", "code"] });

export const wordBreakProblem: Problem<
  WordBreakInput,
  WordBreakState
> = {
  title: title,
  code: code,
  getInput: getInput,
  func: canBreak,
};
