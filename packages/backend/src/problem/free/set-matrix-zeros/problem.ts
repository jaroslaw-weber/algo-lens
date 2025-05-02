import { Problem, ProblemState } from "algo-lens-core";
// types.ts does not exist
// steps.ts does not exist
// variables.ts does not exist
// groups.ts does not exist
import { code } from "./code";
import { testcases } from "./testcase";

// Define InputType based on code.ts
type InputType = { matrix: number[][] };
// OutputType is ProblemState for the func, but the core code returns void

// Define generateSteps function placeholder as steps.ts doesn't exist
const generateSteps = undefined; // Set func to undefined

export const problem: Problem<InputType, ProblemState> = {
  title: "Set Matrix Zeros", // Titleized folder name
  code: code,
  func: generateSteps, // Set to undefined
  testCases: testcases,
  id: "set-matrix-zeros", // Folder name
  tags: ["array", "matrix", "hash-table"], // Guessed tags
  metadata: {
    // variables: undefined, // Not imported
    // groups: undefined, // Not imported
  },
};
