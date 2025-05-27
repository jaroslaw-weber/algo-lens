import { Problem } from "algo-lens-core";
import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";
import { Input, ListNode } from "./types";

export const problem: Problem<Input, boolean> = {
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
