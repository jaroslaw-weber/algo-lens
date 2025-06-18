// Imports specific utility functions and type definitions
import { Problem, ProblemState } from "algo-lens-core/src/types";

import { ContainsDuplicateInput } from "./types"; // New import
import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Contains Duplicate";

// Export the complete problem setup including the input function, the computational function, and other metadata
export const problem: Problem<ContainsDuplicateInput, ProblemState> = {
  title,
  emoji: "👯",
  func: generateSteps, // Use local function
  testcases,
  id: "contains-duplicate", // Keep original ID for now, might need adjustment later
  tags: ["hashset"],
  difficulty: "medium",
  metadata: {
    groups: [], // Keep groups as empty for now, unless defined elsewhere
    variables, // Use the imported variables
  },
  codegen: {
    signature: "containsDuplicate(nums: number[]): boolean",
  },
};
