import { Problem, ProblemState } from "algo-lens-core";
import { variables } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { testcases } from "./testcase";

export const problem: Problem<number[], ProblemState> = {
  title: "Three Sum",
  emoji: "🔢",
  func: generateSteps,
  testcases: testcases,
  id: "3sum",
  tags: ["array", "hash set", "two pointers"],
  metadata: {
    variables,
    groups,
  },
};
