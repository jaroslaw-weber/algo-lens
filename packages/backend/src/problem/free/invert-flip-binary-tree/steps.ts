import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { BinaryTree, TreeNode } from "./types";

export function getSteps(root: BinaryTree) {
  const logger = new StepLoggerV2();

  function invertTree(node: BinaryTree): BinaryTree {
    if (!node) {
      return null;
    }

    logger.comment = `Inverting node with value ${node.val}`;
    logger.tree("root", JSON.parse(JSON.stringify(root)), [
      { node: node, color: "neutral" },
    ]);
    logger.breakpoint(0);

    const left = invertTree(node.left);
    const right = invertTree(node.right);

    node.left = right;
    node.right = left;

    logger.comment = `Swapped children of node with value ${node.val}`;
    logger.tree("root", JSON.parse(JSON.stringify(root)), [
      { node: node, color: "neutral" },
    ]);
    logger.breakpoint(0);

    return node;
  }

  invertTree(root);

  logger.comment = "Tree inversion complete";
  logger.tree("root", JSON.parse(JSON.stringify(root)));
  logger.breakpoint(0);

  return logger.getSteps();
}
