import { Problem } from "@algolens/core/src/types";

import { getSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";

import { BinaryTree } from "./types";

export const problem: Problem<BinaryTree, BinaryTree> = {
  id: "invert-flip-binary-tree",
  title: "Invert/Flip Binary Tree",
  emoji: "🌳",
  difficulty: "easy",
  func: (x) => getSteps(x),
  testcases,
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "invertTree(root: TreeNode | null): TreeNode | null",
  },
};
