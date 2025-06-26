import { Problem, ProblemState } from "algo-lens-core/src/types";

import { variables } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { testcases } from "./testcase";
import { ThreeSumInput } from "./types";

export const problem: Problem<ThreeSumInput, ProblemState> = {
  title: "Three Sum",
  emoji: "🔢",
  func: generateSteps,
  testcases: testcases,
  difficulty: "medium",
  id: "3sum",
  tags: ["array", "hash set", "two pointers"],
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "threeSteps(numbers: number[])",
  },
};
