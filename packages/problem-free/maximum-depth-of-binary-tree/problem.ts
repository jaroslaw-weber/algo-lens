import { Problem } from "@algolens/core/src/types";

import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";
import { Input, Output } from "./types";

export const problem: Problem<Input, Output> = {
  id: "maximum-depth-of-binary-tree",
  title: "Maximum Depth of Binary Tree",
  emoji: "🌳",
  difficulty: "easy",
  func: generateSteps,
  testcases,
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "maxDepth(root: TreeNode | null): number",
  },
};
