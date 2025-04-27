import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { code } from "./code";
import { MaximumSubarrayInput } from "./types";

const title = "Maximum Subarray";
const getInput = () => ({
  // Original input: [-2, 1, -3, 4, -1, 2, 1, -5, 4], Output: 6
  // More complex input from original file:
  nums: [-2, 2, 1, -9, 4, -7, 2, 1, 1, 5, -5, 4], // Output: 10
});

export const maximumSubarrayProblem: Problem<MaximumSubarrayInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: generateSteps, // Use generateSteps from steps.ts
  id: "maximum-subarray",
  tags: ["dynamic programming", "array", "kadane's algorithm"], // Added relevant tags
  tested: true, // Assuming it was tested, keep as true
  metadata: {
    variables: variableMetadata,
    groups: groups,
  },
};
