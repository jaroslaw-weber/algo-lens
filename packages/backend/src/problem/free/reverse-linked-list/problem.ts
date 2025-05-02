import { Problem, ProblemState, ListNode } from "algo-lens-core"; // Added ListNode
// types.ts does not exist
// steps.ts does not exist
// variables.ts does not exist
// groups.ts does not exist
import { code } from "./code";
import { testcases } from "./testcase";

// Define InputType based on code.ts
type InputType = { head: ListNode | null };
// OutputType is ProblemState for the func, but the core code returns ListNode | null

// Define generateSteps function placeholder as steps.ts doesn't exist
const generateSteps = undefined;

export const problem: Problem<InputType, ProblemState> = {
  title: "Reverse Linked List", // Titleized folder name
  code: code,
  func: generateSteps, // Undefined as steps.ts is missing
  testCases: testcases,
  id: "reverse-linked-list", // Folder name
  tags: ["linked-list", "recursion"], // Guessed tags
  metadata: {
    // variables: undefined, // Not imported
    // groups: undefined, // Not imported
  },
};
