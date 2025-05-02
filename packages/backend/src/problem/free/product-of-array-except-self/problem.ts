import { Problem, ProblemState } from "algo-lens-core";
// types.ts does not exist
// steps.ts does not exist
// variables.ts does not exist
// groups.ts does not exist
import { code } from "./code";
import { testcases } from "./testcase";

// Define InputType based on code.ts
type InputType = { nums: number[] };
// OutputType is ProblemState for the func, but the core code returns number[]

// Define generateSteps function placeholder as steps.ts doesn't exist
const generateSteps = undefined;

export const problem: Problem<InputType, ProblemState> = {
  title: "Product of Array Except Self", // Titleized folder name
  code: code,
  func: generateSteps, // Undefined as steps.ts is missing
  testCases: testcases,
  id: "product-of-array-except-self", // Folder name
  tags: ["array", "prefix sum"], // Guessed tags
  metadata: {
    // variables: undefined, // Not imported
    // groups: undefined, // Not imported
  },
};
