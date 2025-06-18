
import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";
import { DetectCycleInput } from "./types";
import { Problem, ProblemState } from "algo-lens-core";

export const problem: Problem<DetectCycleInput, ProblemState> = {
  id: "detect-cycle-in-a-linked-list",
  title: "Detect Cycle in a Linked List",
  emoji: "🔗",
  difficulty: "easy",
  tags: ["Linked List", "Two Pointers", "Cycle Detection"],
  func: generateSteps,
  testcases,

  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "hasCycle(head: ListNode | null): boolean",
  },
};
