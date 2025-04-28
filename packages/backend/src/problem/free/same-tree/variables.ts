import {
  HighlightColor,
  Variable,
  TreeNode,
  NodeHighlight,
} from "algo-lens-core";
import { asTree as utilAsTree, asBooleanGroup as utilAsBooleanGroup } from "../../core/utils"; // Adjust path assuming utils is two levels up

// Helper function to create the 'pTree' variable representation
export function asPTree(
  root: TreeNode | null,
  pNode: TreeNode | null,
  color: HighlightColor
): Variable {
  const highlights: NodeHighlight[] = pNode ? [{ node: pNode, color }] : [];
  return utilAsTree("pTree", root, highlights);
}

// Helper function to create the 'qTree' variable representation
export function asQTree(
  root: TreeNode | null,
  qNode: TreeNode | null,
  color: HighlightColor
): Variable {
  const highlights: NodeHighlight[] = qNode ? [{ node: qNode, color }] : [];
  return utilAsTree("qTree", root, highlights);
}

// Helper function to create the 'is node same?' boolean group variable
export function asResult(result: boolean): Variable {
    // The key "return" might be problematic, using "result" instead for the boolean group key
  return utilAsBooleanGroup("is node same?", { "result": result });
}
