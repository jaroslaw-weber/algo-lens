import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Will import the renamed function
import { merge as code } from "./code/typescript"; // Import the actual solution function
import { MergeIntervalsInput } from "./types"; // Import input type from types.ts
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

export const problem: Problem<MergeIntervalsInput, ProblemState> = {
  title: "Merge Intervals",
  emoji: "🤝",
  testcases,
  difficulty: "medium",
  func: code, // Use the actual solution function 'code' (aliased from merge)
  id: "merge-intervals",
  tags: ["interval"],
  visualizer: generateSteps, // Use generateSteps for visualization
  metadata: {
    variables,
    groups,
  },
};
