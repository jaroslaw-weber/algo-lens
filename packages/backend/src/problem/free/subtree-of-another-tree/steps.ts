import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { BinaryTree, TreeNode } from "./types";

export function getSteps(input: [BinaryTree, BinaryTree]): ProblemState[] {
  // HIDE_START
  const [root, subRoot] = input;
  // HIDE_END
  const l = new StepLoggerV2();
  let result: boolean;

  // If subRoot is null, it is a subtree only if root is also null.
  // Otherwise, an empty tree is not a subtree of a non-empty tree.
  if (!subRoot) {
    if (!root) {
      l.comment = `Both root and subRoot are null. They are the same.`;
      l.breakpoint(1);
      result = true;
    } else {
      l.comment = `subRoot is null, but root is not. An empty tree is not a subtree of a non-empty tree.`;
      l.breakpoint(2);
      result = false;
    }
  } else if (!root) {
    // If root is null and subRoot is not null, it cannot be a subtree
    l.comment = `root is null and subRoot is not null. subRoot cannot be a subtree.`;
    l.breakpoint(3);
    result = false;
  } else {
    // Helper function to check if two trees are identical
    function isSameTree(p: BinaryTree, q: BinaryTree): boolean {
      // Log the comparison of two nodes
      l.comment = `Comparing nodes: ${p?.val ?? "null"} and ${q?.val ?? "null"}`;
      l.tree("root", root, [
        { node: p, color: "neutral", label: "Root node" },
        { node: q, color: "neutral", label: "SubRoot node" },
      ]);
      l.tree("subRoot", subRoot, [
        { node: q, color: "neutral", label: "SubRoot node" },
      ]);
      l.breakpoint(4);

      if (!p && !q) {
        l.comment = `Both nodes are null. They are the same.`;
        l.breakpoint(5);
        return true;
      }
      if (!p || !q || p.val !== q.val) {
        l.comment = `Nodes are different (one is null or values differ). They are not the same.`;
        l.breakpoint(6);
        return false;
      }

      // Recursively check left and right subtrees
      const leftSame = isSameTree(p.left, q.left);
      const rightSame = isSameTree(p.right, q.right);

      return leftSame && rightSame;
    }

    // Helper function to find if subRoot is a subtree of node
    function findSubtree(node: BinaryTree): boolean {
      if (!node) {
        l.comment = `Reached null node in root tree. No match found here.`;
        l.breakpoint(7);
        return false;
      }

      l.comment = `Checking if subtree at node ${node.val} matches subRoot.`;
      l.tree("root", root, [
        { node: node, color: "neutral", label: "Current node" },
      ]);
      l.tree("subRoot", subRoot);
      l.breakpoint(8);

      if (isSameTree(node, subRoot)) {
        l.comment = `Found a matching subtree starting at node ${node.val}.`;
        l.tree("root", root, [
          { node: node, color: "good", label: "Match found" },
        ]);
        l.tree("subRoot", subRoot, [
          { node: subRoot, color: "good", label: "Matching subtree" },
        ]);
        l.breakpoint(9);
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

      l.comment = `No matching subtree found at node ${node.val} or its children.`;
      l.breakpoint(10);
      return false;
    }
    result = findSubtree(root); // Calculate the result
  }

  l.comment = `Final result: ${result ? "SubRoot is a subtree." : "SubRoot is NOT a subtree."}`;
  l.tree("root", root);
  l.tree("subRoot", subRoot);
  l.simple({ result: result }); // Log the final result
  l.breakpoint(11); // Save the state with the final result
  return l.getSteps();
}
