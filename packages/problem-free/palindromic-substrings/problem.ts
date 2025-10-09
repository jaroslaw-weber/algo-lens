import { Problem, ProblemState } from "@algolens/core/src/types";

import { variables } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { testcases } from "./testcase";
import { PalindromicSubstringsInput } from "./types";

export const problem: Problem<PalindromicSubstringsInput, ProblemState> = {
  title: "Palindromic Substrings",
  emoji: "📝",
  func: generateSteps,
  testcases: testcases,
  difficulty: "medium",
  id: "palindromic-substrings",
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "countSubstrings(s: string)",
  },
};
