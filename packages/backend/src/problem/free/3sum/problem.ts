import { Problem, ProblemState } from "algo-lens-core";
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
  id: "15",
  tags: ["array", "hash set", "two pointers"],
  metadata: {
    variables,
    groups,
  },
};
