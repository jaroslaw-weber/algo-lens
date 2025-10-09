import { Problem, ProblemState } from "@algolens/core/src/types";

import { generateSteps } from "./steps";
import { LongestSubstringInput } from "./types";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";

export const problem: Problem<LongestSubstringInput, ProblemState> = {
  id: "longest-substring-without-repeating-characters",
  title: "Longest Substring Without Repeating Characters",
  description:
    "Given a string `s`, find the length of the longest substring without repeating characters.",
  func: generateSteps,
  testcases: testcases,
  emoji: "📏",
  difficulty: "medium",
  metadata: {
    variables: variables,
    groups: groups,
  },
  codegen: {
    signature: "lengthOfLongestSubstring(s: string): number",
  },
};
