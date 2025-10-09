import { Problem } from "@algolens/core/src/types";

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
  func: (x) => getSteps(x),
  testcases,
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature:
      "isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean",
  },
};
