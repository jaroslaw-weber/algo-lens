import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { BinaryTree, TreeNode } from "./types";

export function getSteps(input: [BinaryTree, BinaryTree]) {
  const [root, subRoot] = input;
  const logger = new StepLoggerV2();

  function isSameTree(p: BinaryTree, q: BinaryTree): boolean {
    // Log the comparison of two nodes
    logger.comment = `Comparing nodes: ${p?.val ?? "null"} and ${q?.val ?? "null"}`;
    logger.tree("root", JSON.parse(JSON.stringify(root)), [
      { node: p, color: "neutral" },
    ]);
    logger.tree("subRoot", JSON.parse(JSON.stringify(subRoot)), [
      { node: q, color: "neutral" },
    ]);
    logger.breakpoint(0);

    if (!p && !q) {
      logger.comment = `Both nodes are null. They are the same.`;
      logger.breakpoint(0);
      return true;
    }
    if (!p || !q || p.val !== q.val) {
      logger.comment = `Nodes are different (one is null or values differ). They are not the same.`;
      logger.breakpoint(0);
      return false;
    }

    // Recursively check left and right subtrees
    const leftSame = isSameTree(p.left, q.left);
    const rightSame = isSameTree(p.right, q.right);

    return leftSame && rightSame;
  }

  function findSubtree(node: BinaryTree): boolean {
    if (!node) {
      logger.comment = `Reached null node in root tree. No match found here.`;
      logger.breakpoint(0);
      return false;
    }

    logger.comment = `Checking if subtree at node ${node.val} matches subRoot.`;
    logger.tree("root", JSON.parse(JSON.stringify(root)), [
      { node: node, color: "neutral" },
    ]);
    logger.tree("subRoot", JSON.parse(JSON.stringify(subRoot)));
    logger.breakpoint(0);

    if (isSameTree(node, subRoot)) {
      logger.comment = `Found a matching subtree starting at node ${node.val}.`;
      logger.tree("root", JSON.parse(JSON.stringify(root)), [
        { node: node, color: "good" },
      ]);
      logger.tree("subRoot", JSON.parse(JSON.stringify(subRoot)));
      logger.breakpoint(0);
      return true;
    }

    // Recursively check left and right children
    const leftResult = findSubtree(node.left);
    if (leftResult) {
      return true;
    }
    const rightResult = findSubtree(node.right);
    if (rightResult) {
      return true;
    }

    logger.comment = `No matching subtree found at node ${node.val} or its children.`;
    logger.breakpoint(0);
    return false;
  }

  const result = findSubtree(root);

  logger.comment = `Final result: ${result ? "SubRoot is a subtree." : "SubRoot is NOT a subtree."}`;
  logger.tree("root", JSON.parse(JSON.stringify(root)));
  logger.tree("subRoot", JSON.parse(JSON.stringify(subRoot)));
  logger.breakpoint(0);

  return logger.getSteps();
}
