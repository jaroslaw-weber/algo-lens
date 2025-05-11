import { Problem, ProblemState } from "algo-lens-core";
import { variables } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { ClimbingStairsInput } from "./types";
import { testcases } from "./testcase";

const title = "Climbing Stairs";

export const problem: Problem<ClimbingStairsInput, ProblemState> = {
  title: title,
  emoji: "🪜",
  func: generateSteps, // Use generateSteps from steps.ts
  testcases,
  id: "climbingStairs",
  tags: ["dynamic programming"],
  difficulty: "easy",
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "climbStairs(n: number): number",
  },
};
