import { Problem, ProblemState } from "algo-lens-core"; // Assuming ProblemState is the correct state type
import { generateSteps } from "./steps"; // Will import the renamed function
import { minPathSum } from "./code/typescript";
import { MinPathSumInput } from "./types"; // Import input type from types.ts
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

const title = "Minimum Path Sum";

// Note: The original file used MinPathSumState, but ProblemState is the standard.
// If specific state aspects were needed, they'd be handled within generateSteps.
export const problem: Problem<MinPathSumInput, ProblemState> = {
  title: title,
  emoji: "🗺️",
  testcases,
  difficulty: "medium",
  func: generateSteps, // Use the renamed function
  id: "minimumPathSum",
  tags: ["2d dynamic programming"],
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "minPathSum(grid: number[][]): number",
  },
};
