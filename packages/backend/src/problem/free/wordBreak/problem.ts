import { Problem } from "algo-lens-core";
import { WordBreakInput, WordBreakProblemState } from "./types"; // Assuming ProblemState might be specific later
import { wordBreak } from "./code";
import { code } from "./code/solution";

const title = "Word Break";

// Note: getInput might need adjustment if its dependencies change
const getInput = () => ({
  s: "catsandog",
  wordDict: ["cats", "dog", "sand", "and", "cat"],
});

export const problem: Problem<WordBreakInput, WordBreakProblemState> = {
  title: title,
  emoji: '📖',
  code: code, // Import from code/solution.ts
  func: wordBreak, // Import from code/index.ts
  id: "139",
  tags: ["dynamic programming", "string"],
  getInput: getInput, // Add the getInput function here
};
