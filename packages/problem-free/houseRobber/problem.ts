import { Problem, ProblemState } from "@algolens/core/src/types";

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
  codegen: {
    // Added codegen property
    signature: "rob(nums: number[]): number", // Added signature
  },
  difficulty: "medium",
  testcases, // Added testcases
  id: "houseRobber", // Updated id
  metadata: {
    // Add metadata
    variables,
    groups: groups,
  },
};
