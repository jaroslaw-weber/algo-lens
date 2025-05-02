import { Problem, ProblemState } from "algo-lens-core";
import { HouseRobberInput } from "./types"; // Import from types.ts
import { generateSteps } from "./steps"; // Import generateSteps from steps.ts
import { code } from "./code"; // Import from code.ts
import { groups } from "./groups"; // Import groups
import { variableMetadata } from "./variables"; // Import variableMetadata
import { testcases } from "./testcase";

const title = "House Robber";
const getInput = () => ({ nums: [2, 7, 9, 3, 1] }); // Ensure getInput is defined

export const problem: Problem<HouseRobberInput, ProblemState> = {
  title: title,
  code: code, // Use imported code
  getInput: getInput,
  func: generateSteps, // Use imported generateSteps function
  id: "house-robber",
  testCases: testcases,
  tested: true, // Keep tested as true
  tags: ["dynamic programming"], // Keep tags
  metadata: { // Add metadata
    variables: variableMetadata,
    groups: groups,
  },
};
