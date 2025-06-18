import { Problem, ProblemState } from "algo-lens-core/src/types";

import { generateSteps } from "./steps";
import { LISInput } from "./types";
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

const title = "Longest Increasing Subsequence";

export const problem: Problem<LISInput, ProblemState> = {
  title: title,
  emoji: "📈",
  func: generateSteps,
  testcases,
  id: "longestIncreasingSubsequence",
  difficulty: "easy",
  tags: ["dynamic programming", "array", "binary search"],
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "lengthOfLIS(nums: number[]): number",
  },
};
