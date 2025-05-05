import { Problem, ProblemState } from "algo-lens-core";
import { SearchInput } from "./types";
import { generateSteps } from "./steps";
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";
import { solutionCode } from "./code/typescript"; // Adjusted import path for solutionCode

// Define the problem configuration
export const problem: Problem<SearchInput, ProblemState> = {
  title: "Search in Rotated Sorted Array",
  emoji: '🔍',
  func: generateSteps, // Use the step generation function
  id: "search-in-rotated-sorted-array",
  tags: ["array", "binary-search"],
  testcases, // Use the imported test cases
  metadata: {
    variables, // Use the imported variable metadata
    groups, // Use the imported variable groups
    code: solutionCode, // Use the imported solution code string
  },
};
