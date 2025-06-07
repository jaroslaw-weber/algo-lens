import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { BinaryTree, TreeNode } from "./types";

export function getSteps(root: BinaryTree): ProblemState[] {
  const l = new StepLoggerV2();

  function invert(node: BinaryTree): BinaryTree {
    if (!node) {
      return null;
    }

    l.comment = `Travering the node: ${node.val}`;
    l.tree("root", root, [{ node: node, color: "neutral", label: "current" }]);

    l.breakpoint(1);

    const left = invert(node.left);
    const right = invert(node.right);

    l.tree("root", root, [
      { node: node, color: "neutral", label: "current" },
      { node: node.left, color: "good", label: "left" },
      { node: node.right, color: "bad", label: "right" },
    ]);
    l.comment = `Swapping children of node with value ${node.val}`;

    l.breakpoint(1);

    node.left = right;
    node.right = left;

    l.comment = `Swapped!`;
    l.tree("root", root, [
      { node: node, color: "neutral", label: "current" },
      { node: node.left, color: "bad", label: "left (swapped)" },
      { node: node.right, color: "good", label: "right (swapped)" },
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
