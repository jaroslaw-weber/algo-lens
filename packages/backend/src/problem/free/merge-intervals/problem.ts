import { Problem, ProblemState } from "algo-lens-core";
// Removed import { generateSteps } from "./steps"; // Will import the renamed function
import { merge } from "./code/typescript"; // Corrected import
import { MergeIntervalsInput } from "./types"; // Import input type from types.ts
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

export const problem: Problem<MergeIntervalsInput, ProblemState> = {
  title: "Merge Intervals",
  emoji: "🤝",
  testcases,
  difficulty: "medium",
  func: merge, // Use the imported merge function
  id: "merge-intervals",
  tags: ["interval"],
  metadata: {
    variables,
    groups,
  },
};
