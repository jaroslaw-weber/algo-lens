// Import necessary types and functions
import { Problem, ProblemState } from "algo-lens-core"; // Keep ProblemState
import { ReverseListInput } from "./types"; // Keep ReverseListInput import
// import { reverseLinkedList as code } from "./code/typescript"; // Remove original code import
import { generateSteps } from "./steps"; // Import generateSteps
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

const title = "Reverse Linked List";

export const problem: Problem<ReverseListInput, ProblemState> = {
  title,
  emoji: "↩️",
  func: generateSteps, // Use generateSteps to get the detailed steps
  id: "reverse-list",
  tags: ["linked-list"],
  difficulty: "medium", // Assuming medium, adjust if needed
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "reverseList(head: ListNode | null): ListNode | null",
  },
  testcases,
};
