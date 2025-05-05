// Import necessary types and functions
import { Problem, ProblemState } from "algo-lens-core";
import { ReverseListInput } from "./types"; // Import from new types file
import { reverseList } from "./steps"; // Import from new steps file
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

const title = "Reverse Linked List";

export const problem: Problem<ReverseListInput, ProblemState> = {
  title,
  emoji: "↩️",
  func: reverseList,
  id: "206",
  tags: ["linked-list"],
  difficulty: "medium",
  metadata: {
    variables,
    groups,
  },
  testcases,
};
