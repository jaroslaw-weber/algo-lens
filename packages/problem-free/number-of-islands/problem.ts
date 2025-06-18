import { Problem, ProblemState } from "algo-lens-core/src/types";

import { generateSteps } from "./steps"; // Will import the renamed function
import { NumIslandsInput } from "./types"; // Import input type from types.ts
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

// Description for a larger, more complex input set to test and visualize the algorithm

// Export the complete problem setup including the input function, the computational function, and other metadata
export const problem: Problem<NumIslandsInput, ProblemState> = {
  title: "Number of Islands",
  emoji: "🏝️",
  func: generateSteps, // Use the renamed function
  id: "number-of-islands",
  difficulty: "medium",
  tags: ["graph"],
  metadata: { variables, groups },
  codegen: {
    signature: "numIslands(grid: string[][]): number",
  },
  testcases,
};
