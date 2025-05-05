// Import necessary types and functions
import { Problem, ProblemState } from "algo-lens-core";
import { ReverseListInput } from "./types"; // Import from new types file
import { reverseLinkedList as code } from "./code/typescript"; // Import from code file
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

const title = "Reverse Linked List";

export const problem: Problem<ReverseListInput, ProblemState> = {
  title,
  emoji: "↩️",
  func: generateSteps, // Changed from code to generateSteps
  id: "reverse-list",
  tags: ["linked-list"],
  difficulty: "medium",
  metadata: {
    variables,
    groups,
  },
  testcases,
};
