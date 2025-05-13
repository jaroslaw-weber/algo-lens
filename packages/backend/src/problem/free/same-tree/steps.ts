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
    l.comment = `Compare the current nodes from both trees, pNode (${ pNode ? pNode.val : "null" }) and qNode (${qNode ? qNode.val : "null"}), to check if they are the same.`;
    l.breakpoint(1); // Log initial call

    if (!pNode && !qNode) {
      // pNode and qNode are null, so pass empty array
      l.tree("pTree", p, []);
      l.tree("qTree", q, []);
      l.simple({ "is node same?": true });
      l.comment = "Base case: Both current nodes are null. This means we have reached the end of a branch in both trees simultaneously, indicating that this part of the trees is the same. Return true.";
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
      l.comment = `Base case: One of the current nodes is null, while the other is not. pNode is ${ pNode ? pNode.val : "null" }, and qNode is ${ qNode ? qNode.val : "null" }. If one tree has a node here and the other doesn't, the trees are different. Return false.`;
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
      l.comment = `Both current nodes are not null, so compare their values. If the value of pNode (${pNode.val}) is different from the value of qNode (${qNode.val}), the trees are not the same. Return false.`;
      l.breakpoint(4); // Log values differ
      return false;
    }
    // Highlight current nodes as matching before recursion (nodes are non-null)
    l.tree("pTree", p, [{ node: pNode, color: "good" as HighlightColor }]);
    l.tree("qTree", q, [{ node: qNode, color: "good" as HighlightColor }]);
    l.simple({ "is node same?": true }); // Log values are same before recursing
    // No breakpoint here, the next breakpoint will be 1 from the recursive call or 5 if returning

    // Recursively check left and right subtrees
    const leftSame = checkNodes(pNode.left, qNode.left);
    // Short-circuit if left is not the same - log overall result for this node (nodes are non-null)
    if (!leftSame) {
      l.tree("pTree", p, [{ node: pNode, color: "bad" as HighlightColor }]);
      l.tree("qTree", q, [{ node: qNode, color: "bad" as HighlightColor }]);
      l.simple({ "overall result": false });
      l.comment = `The current nodes have the same value. Now, recursively check if their left subtrees are the same. If the left subtrees are not the same (${leftSame} is false), then the entire trees are not the same, regardless of the right subtrees. Return false.`;
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
    l.comment = `The current nodes have the same value, and their left subtrees are the same (${leftSame} is true). Now, recursively check if their right subtrees are the same (${rightSame}). The overall result for this pair of nodes is true only if both the left and right subtrees are the same. Overall result for this node: ${result}.`;
    l.breakpoint(5); // Note: Breakpoint 5 is used multiple times, which is fine.
    return result;
  }

  // Start the recursive checking process
  const result = checkNodes(p, q);
  l.simple({ result });
  l.comment = `The recursive process has completed. The overall result for comparing the entire tree p with the entire tree q is ${result}. If the result is true, the trees are identical; otherwise, they are different.`;
  l.breakpoint(6); // Log overall result for the entire tree

  return l.getSteps();
}
