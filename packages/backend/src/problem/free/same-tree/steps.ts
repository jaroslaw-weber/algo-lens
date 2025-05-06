import {
  HighlightColor,
  BinaryTreeNode,
  Variable, // Kept Variable as StepLoggerV2 might implicitly use it via utils
  ProblemState, // Need ProblemState for the return type
} from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import { SameTreeInput } from "./types"; // Keep input type for context

// The main function that generates the steps for the visualization
export function sameTree(
  p: BinaryTreeNode | null,
  q: BinaryTreeNode | null
): ProblemState[] {
  const l = new StepLoggerV2();

  function checkNodes(
    pNode: BinaryTreeNode | null,
    qNode: BinaryTreeNode | null
  ): boolean {
    // Use conditional logic for highlights
    l.tree(
      "pTree",
      p,
      pNode ? [{ node: pNode, color: "neutral" as HighlightColor }] : []
    );
    l.tree(
      "qTree",
      q,
      qNode ? [{ node: qNode, color: "neutral" as HighlightColor }] : []
    );
    l.breakpoint(1); // Log initial call

    if (!pNode && !qNode) {
      // pNode and qNode are null, so pass empty array
      l.tree("pTree", p, []);
      l.tree("qTree", q, []);
      l.simple({ "is node same?": true });
      l.breakpoint(2); // Log base case: both null
      return true;
    }
    if (!pNode || !qNode) {
      // Use conditional logic for highlights
      l.tree(
        "pTree",
        p,
        pNode ? [{ node: pNode, color: "bad" as HighlightColor }] : []
      );
      l.tree(
        "qTree",
        q,
        qNode ? [{ node: qNode, color: "bad" as HighlightColor }] : []
      );
      l.simple({ "is node same?": false });
      l.breakpoint(3); // Log base case: one null
      return false;
    }
    // Highlight current nodes before value comparison (nodes are guaranteed non-null here)
    l.tree("pTree", p, [{ node: pNode, color: "neutral" as HighlightColor }]);
    l.tree("qTree", q, [{ node: qNode, color: "neutral" as HighlightColor }]);
    if (pNode.val !== qNode.val) {
      // Nodes are non-null
      l.tree("pTree", p, [{ node: pNode, color: "bad" as HighlightColor }]);
      l.tree("qTree", q, [{ node: qNode, color: "bad" as HighlightColor }]);
      l.simple({ "is node same?": false });
      l.breakpoint(4); // Log values differ
      return false;
    }
    // Highlight current nodes as matching before recursion (nodes are non-null)
    l.tree("pTree", p, [{ node: pNode, color: "good" as HighlightColor }]);
    l.tree("qTree", q, [{ node: qNode, color: "good" as HighlightColor }]);
    l.simple({ "is node same?": true }); // Log values are same before recursing

    // Recursively check left and right subtrees
    const leftSame = checkNodes(pNode.left, qNode.left);
    // Short-circuit if left is not the same - log overall result for this node (nodes are non-null)
    if (!leftSame) {
      l.tree("pTree", p, [{ node: pNode, color: "bad" as HighlightColor }]);
      l.tree("qTree", q, [{ node: qNode, color: "bad" as HighlightColor }]);
      l.simple({ "overall result": false });
      l.breakpoint(5);
      return false;
    }
    const rightSame = checkNodes(pNode.right, qNode.right);
    const result = leftSame && rightSame;

    // Log overall result for this node (nodes are non-null)
    l.tree("pTree", p, [
      { node: pNode, color: (result ? "good" : "bad") as HighlightColor },
    ]);
    l.tree("qTree", q, [
      { node: qNode, color: (result ? "good" : "bad") as HighlightColor },
    ]);
    l.simple({ "overall result": result });
    l.breakpoint(5); // Note: Breakpoint 5 is used multiple times, which is fine.
    return result;
  }

  // Start the recursive checking process
  const result = checkNodes(p, q);
  l.simple({ result });
  l.breakpoint(6); // Log overall result for the entire tree

  return l.getSteps();
}
