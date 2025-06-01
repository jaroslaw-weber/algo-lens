import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { BinaryTree, TreeNode } from "./types";

export function getSteps(root: BinaryTree) {
  const l = new StepLoggerV2();

  function invertTree(node: BinaryTree): BinaryTree {
    if (!node) {
      return null;
    }

    l.comment = `Inverting node with value ${node.val}`;
    l.tree("root", JSON.parse(JSON.stringify(root)), [
      { node: node, color: "neutral" },
    ]);
    l.breakpoint(0);

    const left = invertTree(node.left);
    const right = invertTree(node.right);

    node.left = right;
    node.right = left;

    l.comment = `Swapped children of node with value ${node.val}`;
    l.tree("root", JSON.parse(JSON.stringify(root)), [
      { node: node, color: "neutral" },
    ]);
    l.breakpoint(0);

    return node;
  }

  invertTree(root);

  const result = root;
  l.comment = "Tree inversion complete";
  l.tree("result", result);
  l.breakpoint(0);

  return l.getSteps();
}
