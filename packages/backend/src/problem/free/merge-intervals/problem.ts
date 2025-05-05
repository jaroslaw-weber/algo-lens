import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Will import the renamed function
import { code } from "./code/typescript";
import { MergeIntervalsInput } from "./types"; // Import input type from types.ts
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

export const problem: Problem<MergeIntervalsInput, ProblemState> = {
  title: "Merge Intervals",
  emoji: "🤝",
  testcases,
  difficulty: "medium",
  func: generateSteps, // Use the renamed function
  id: "56",
  tags: ["interval"],
  metadata: {
    variables,
    groups,
  },
};
