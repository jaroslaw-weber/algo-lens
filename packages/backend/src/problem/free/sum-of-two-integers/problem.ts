import { Problem, ProblemState } from "algo-lens-core";
// types.ts does not exist
// steps.ts does not exist
// variables.ts does not exist
// groups.ts does not exist
import { code } from "./code";
import { testcases } from "./testcase";

// Define InputType based on code.ts
type InputType = { a: number; b: number };
// OutputType is ProblemState for the func, but the core code returns number

// Define generateSteps function placeholder as steps.ts doesn't exist
const generateSteps = undefined;

export const problem: Problem<InputType, ProblemState> = {
  title: "Sum Of Two Integers", // Titleized folder name
  code: code,
  func: generateSteps, // Undefined as steps.ts is missing
  testCases: testcases,
  id: "sum-of-two-integers", // Folder name
  tags: ["bit manipulation", "math"], // Guessed tags
  metadata: {
    // variables: undefined, // Not imported
    // groups: undefined, // Not imported
  },
};
