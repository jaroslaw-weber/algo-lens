import { BinaryTreeNode, HighlightColor, Variable } from "algo-lens-core";
// Note: Removed Problem, ProblemState, as they are not directly used here anymore
// Note: Removed asBooleanGroup, asTree as they are used in steps.ts

// The core recursive logic for checking if two trees are the same.
// Now accepts a 'log' function to record steps for visualization.
export function isSameTree(
  p: BinaryTreeNode | null,
  q: BinaryTreeNode | null
): boolean {

  if (!p && !q) {
    return true;
  }
  if (!p || !q) {
    return false;
  }
  if (p.val !== q.val) {
    return false;
  }

  // Recursively check left and right subtrees
  const leftSame = isSameTree(p.left, q.left);
  // Short-circuit if left is not the same
  if (!leftSame) {
    return false;
  }
  const rightSame = isSameTree(p.right, q.right);
  const result = leftSame && rightSame;
  return result;
}

// The code string representing the algorithm for display purposes
export const code = `function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  //#1
  if (!p && !q) {
    //#2
    return true;
  }
  if (!p || !q) {
    //#3
    return false;
  }
  if (p.val !== q.val) {
    //#4
    return false;
  }
  // Recursively check left and right subtrees
  const leftSame = isSameTree(p.left, q.left);
  const rightSame = isSameTree(p.right, q.right);
  const result = leftSame && rightSame;
  //#5
  return result;
}`;
