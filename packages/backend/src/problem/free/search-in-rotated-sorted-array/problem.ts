import { Problem, ProblemState } from "algo-lens-core";
import { SearchInput } from "./types";
import { generateSteps } from "./steps";
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";
// Define the problem configuration
export const problem: Problem<SearchInput, ProblemState> = {
  title: "Search in Rotated Sorted Array",
  emoji: "🔍",
  func: (i) => generateSteps(...i), // Use the step generation function
  codegen: { // Added codegen property
    signature: "search(nums: number[], target: number): number", // Added signature
  },
  id: "search-in-rotated-sorted-array",
  tags: ["array", "binary-search"],
  difficulty: "medium",
  testcases, // Use the imported test cases
  metadata: {
    variables, // Use the imported variable metadata
    groups, // Use the imported variable groups
  },
};
