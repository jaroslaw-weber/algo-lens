import { Problem, ProblemState } from "algo-lens-core/src/types";

import { generateSteps } from "./steps"; // Will import the renamed function
import { PacificAtlanticInput } from "./types"; // Import input type from types.ts
import { variables } from "./variables"; // Import variables from variables.ts
import { groups } from "./groups"; // Import groups from groups.ts
import { testcases } from "./testcase"; // Import test cases from testcases.ts

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Pacific Atlantic Water Flow";

// Export the complete problem setup including the input function, the computational function, and other metadata
// Note: Original problem didn't have tags, so omitting them here.
export const problem: Problem<PacificAtlanticInput, ProblemState> = {
  title,
  emoji: "🌊",
  metadata: {
    variables,
    groups,
  },
  codegen: { // Added codegen property
    signature: "pacificAtlantic(heights: number[][]): number[][]", // Added signature
  },
  tags: ["grid", "dfs"],
  testcases,
  difficulty: "medium",
  func: (p: PacificAtlanticInput) => generateSteps(p), // Use p directly as it's number[][]
  id: "pacific-atlantic-water-flow", // Keep existing id outside metadata
};
