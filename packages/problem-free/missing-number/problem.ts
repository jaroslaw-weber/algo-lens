import { Problem, ProblemState } from "@algolens/core/src/types";

import { MissingNumberInput } from "./types";
import { generateSteps } from "./steps";
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

// Define the title
const title = "Missing Number";

// Export the complete problem setup
export const problem: Problem<MissingNumberInput, ProblemState> = {
  title,
  emoji: "❓",
  id: "missing-number",
  func: generateSteps, // Imported from ./steps
  codegen: {
    // Added codegen property
    signature: "missingNumber(nums: number[]): number", // Added signature
  },
  testcases,
  difficulty: "easy",
  metadata: {
    variables, // Imported from ./variables
    groups, // Imported from ./groups
  },
};
