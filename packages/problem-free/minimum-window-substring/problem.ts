import { Problem, ProblemState } from "@algolens/core/src/types";

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
  func: generateSteps,
  metadata: {
    variables,
    groups,
  },
  testcases,
  codegen: {
    signature: "minWindow(s: string, t: string): string",
  },
};
