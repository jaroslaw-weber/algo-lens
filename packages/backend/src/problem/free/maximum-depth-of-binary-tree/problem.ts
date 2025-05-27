import { Problem } from "algo-lens-core";
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
  tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
  func: generateSteps,
  testcases,
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "function maxDepth(root: TreeNode | null): number",
  },
};
