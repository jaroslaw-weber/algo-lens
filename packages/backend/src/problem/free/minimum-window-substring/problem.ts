import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";
import { MinimumWindowSubstringInput } from "./types";

export const problem: Problem<MinimumWindowSubstringInput, ProblemState> = {
  id: "minimum-window-substring",
  title: "Minimum Window Substring",
  emoji: "🪟",
  difficulty: "hard",
  tags: ["String", "Hash Map", "Sliding Window"],
  func: generateSteps,
  metadata: {
    variables,
    groups,
  },
  testcases,
  codegen: {
    signature: "function minWindow(s: string, t: string): string",
  },
};
