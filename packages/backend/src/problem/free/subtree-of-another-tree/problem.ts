import { Problem } from "algo-lens-core";
import { getSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";

import { BinaryTree } from "./types";

export const problem: Problem<[BinaryTree, BinaryTree], boolean> = {
  id: "subtree-of-another-tree",
  title: "Subtree of Another Tree",
  emoji: "🌲",
  difficulty: "easy",
  tags: ["Tree", "Depth-First Search", "Binary Tree"],
  func: (x) => getSteps(x),
  testcases,
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature:
      "function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean",
  },
};
