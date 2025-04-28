import {
  ProblemState,
  TreeNode, // Use TreeNode consistently
  Variable,
  HighlightColor,
} from "algo-lens-core";
import { SameTreeInput } from "./types";
import { asPTree, asQTree, asResult } from "./variables";

export function sameTreeSteps(input: SameTreeInput): ProblemState[] {
  const { p, q } = input; // These are the roots passed in
  const steps: ProblemState[] = [];

  // Helper function to log the state
  function log(
    point: number,
    pNode: TreeNode | null, // Current node being compared in p tree
    qNode: TreeNode | null, // Current node being compared in q tree
    result?: boolean
  ) {
    let color: HighlightColor = "neutral";
    if (result === true) {
      color = "good";
    }
    if (result === false) {
      color = "bad";
    }

    // Pass the original roots (p, q) and the current nodes (pNode, qNode)
    const variables: Variable[] = [
      asPTree(p, pNode, color),
      asQTree(q, qNode, color),
    ];

    if (result !== undefined) {
      variables.push(asResult(result));
    }
    steps.push({ variables, breakpoint: point });
  }

  // The recursive function that performs the comparison and logs steps
  function isSameTreeRecursive(
    pNode: TreeNode | null,
    qNode: TreeNode | null
  ): boolean {
    log(1, pNode, qNode); // Log entry point for current comparison

    if (!pNode && !qNode) {
      log(2, pNode, qNode, true); // Both null, they are same
      return true;
    }
    if (!pNode || !qNode) {
      log(3, pNode, qNode, false); // One is null, the other isn't
      return false;
    }
    if (pNode.val !== qNode.val) {
      log(4, pNode, qNode, false); // Values differ
      return false;
    }

    // Recursively check left and right subtrees
    const leftSame = isSameTreeRecursive(pNode.left, qNode.left);
    // Short-circuit if left is already false
    if (!leftSame) {
        log(5, pNode, qNode, false); // Log final result for this node (due to left)
        return false;
    }
    const rightSame = isSameTreeRecursive(pNode.right, qNode.right);
    const result = leftSame && rightSame; // Both must be true
    log(5, pNode, qNode, result); // Log final result for this node
    return result;
  }

  // Start the recursive process with the root nodes
  isSameTreeRecursive(p, q);
  return steps;
}
