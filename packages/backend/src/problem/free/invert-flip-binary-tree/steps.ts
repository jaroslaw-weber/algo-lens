import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { BinaryTree, TreeNode } from "./types";

export function getSteps(root: BinaryTree): ProblemState[] {
  const l = new StepLoggerV2();

  function invert(node: BinaryTree): BinaryTree {
    if (!node) {
      return null;
    }

    l.comment = `Inverting node with value ${node.val}`;
    l.tree("root", JSON.parse(JSON.stringify(root)), [
      { node: node, color: "neutral" },
    ]);
    l.breakpoint(1);

    const left = invert(node.left);
    const right = invert(node.right);

    node.left = right;
    node.right = left;

    l.comment = `Swapped children of node with value ${node.val}`;
    l.tree("root", JSON.parse(JSON.stringify(root)), [
      { node: node, color: "neutral" },
    ]);

    l.breakpoint(2);

    return node;
  }

  invert(root);

  const result = root;
  l.comment = "Tree inversion complete";
  l.tree("result", result);
  l.breakpoint(3);

  return l.getSteps();
}
