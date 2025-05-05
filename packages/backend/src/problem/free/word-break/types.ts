import { ProblemState } from "algo-lens-core";

export interface WordBreakInput {
  s: string;
  wordDict: string[];
}

// Define a specific ProblemState alias for clarity, even if it's the same as the generic one for now
export type WordBreakProblemState = ProblemState;
