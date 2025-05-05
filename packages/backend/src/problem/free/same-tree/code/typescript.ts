import { BinaryTreeNode, HighlightColor, Variable } from "algo-lens-core";

export function isSameTree(
  p: BinaryTreeNode | null,
  q: BinaryTreeNode | null
): boolean {
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
}
