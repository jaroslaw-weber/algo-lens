import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Will import the renamed function
import { code } from "./code";
import { NumIslandsInput } from "./types"; // Import input type from types.ts
import { testcases } from "./testcase";

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Number of Islands";
const getInput = () => ({
  grid: [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const problem: Problem<NumIslandsInput, ProblemState> = {
  title,
  code,
  getInput,
  func: generateSteps, // Use the renamed function
  id: "number-of-islands",
  testCases: testcases,
  tags: ["graph"],
};
