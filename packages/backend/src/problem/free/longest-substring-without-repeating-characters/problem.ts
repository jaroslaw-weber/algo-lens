import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps";
import { LongestSubstringInput } from "./types";
import { testcases } from "./testcase";
import { variables } from "./variables";

export const problem: Problem<LongestSubstringInput, ProblemState> = {
  id: "longest-substring-without-repeating-characters",
  title: "Longest Substring Without Repeating Characters",
  description:
    "Given a string `s`, find the length of the longest substring without repeating characters.",
  func: generateSteps,
  testcases: testcases,
  emoji: "📏",
  tags: ["Sliding Window", "Hash Set", "String"],
  difficulty: "medium",
  metadata: {
    variables: variables,
  },
};
