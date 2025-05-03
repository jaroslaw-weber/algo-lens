import { BinaryTreeNode, HighlightColor, Variable } from "algo-lens-core";
// Note: Removed Problem, ProblemState, as they are not directly used here anymore
// Note: Removed asBooleanGroup, asTree as they are used in steps.ts

// The core recursive logic for checking if two trees are the same.
// Now accepts a 'log' function to record steps for visualization.
export function isSameTree(
  p: BinaryTreeNode | null,
  q: BinaryTreeNode | null,
  log: (
    point: number,
    pNode: BinaryTreeNode | null,
    qNode: BinaryTreeNode | null,
    result?: boolean
  ) => void // Added log parameter type
): boolean {
  log(1, p, q); // Log initial call

  if (!p && !q) {
    log(2, p, q, true); // Log base case: both null
    return true;
  }
  if (!p || !q) {
    log(3, p, q, false); // Log base case: one null
    return false;
  }
  if (p.val !== q.val) {
    log(4, p, q, false); // Log values differ
    return false;
  }

  // Recursively check left and right subtrees
  const leftSame = isSameTree(p.left, q.left, log); // Pass log down
  // Short-circuit if left is not the same
  if (!leftSame) {
    log(5, p, q, false); // Log overall result for this node
    return false;
  }
  const rightSame = isSameTree(p.right, q.right, log); // Pass log down
  const result = leftSame && rightSame;
  log(5, p, q, result); // Log overall result for this node
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
