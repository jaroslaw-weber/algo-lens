import { Problem, ProblemState } from "algo-lens-core";
import { HouseRobberInput } from "./types"; // Import from types.ts
import { generateSteps } from "./steps"; // Import generateSteps from steps.ts
import { groups } from "./groups"; // Import groups
import { variables } from "./variables"; // Import variableMetadata
import { testcases } from "./testcase";

const title = "House Robber";

export const problem: Problem<HouseRobberInput, ProblemState> = {
  title: title,
  emoji: "🏠", // Updated emoji
  func: generateSteps, // Use imported generateSteps function
  difficulty: "medium",
  testcases, // Added testcases
  id: "198", // Updated id
  tags: ["dynamic programming", "array"], // Updated tags
  metadata: {
    // Add metadata
    variables,
    groups: groups,
  },
};
