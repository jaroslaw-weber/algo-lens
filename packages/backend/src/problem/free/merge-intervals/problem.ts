import { Problem, ProblemState } from "algo-lens-core";
import { MergeIntervalsInput } from "./types"; // Import input type from types.ts
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";
import { generateSteps } from "./steps";

export const problem: Problem<MergeIntervalsInput, ProblemState> = {
  title: "Merge Intervals",
  emoji: "🤝",
  testcases,
  difficulty: "medium",
  func: generateSteps, // Use the imported merge function
  id: "merge-intervals",
  tags: ["interval"],
  metadata: {
    variables,
    groups,
  },
};
