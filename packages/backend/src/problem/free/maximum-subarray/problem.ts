import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables"; // Renamed import
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { MaximumSubarrayInput } from "./types";
import { testcases } from "./testcase";

const title = "Maximum Subarray";

export const problem: Problem<MaximumSubarrayInput, ProblemState> = {
  title: title,
  emoji: "📊", // Updated emoji
  func: generateSteps, // Use generateSteps from steps.ts
  testcases, // Added testcases
  difficulty: "medium", // Updated difficulty level
  id: "53",
  tags: ["dynamic programming", "array", "divide and conquer"], // Updated tags
  metadata: {
    variables: variableMetadata, // Updated usage
    groups: groups,
  },
};
