import { Problem, ProblemState } from "@algolens/core/src/types";

import { generateSteps } from "./steps";
import { UniquePathsInput, UniquePathsState } from "./types"; // Keeping UniquePathsState for potential future use
import { variables } from "./variables"; // Import actual variables
import { groups } from "./groups"; // Import actual groups
import { testcases } from "./testcase"; // Import actual testcases

export const problem: Problem<UniquePathsInput, ProblemState> = {
  // Using ProblemState as the second generic type as generateSteps returns ProblemState[]
  title: "Unique Paths",
  emoji: "🤖",
  id: "unique-paths",
  difficulty: "medium",
  func: generateSteps,
  testcases: testcases, // Use imported testcases
  metadata: {
    variables: variables, // Use imported variables
    groups: groups, // Use imported groups
  },
  codegen: {
    signature: "uniquePaths(m: number, n: number): number",
  },
};
