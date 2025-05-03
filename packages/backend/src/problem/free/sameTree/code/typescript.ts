// Import or define necessary types and utilities
import {
  HighlightColor,
  Problem,
  ProblemState,
  BinaryTreeNode, // Keep original import for reference if needed, but types.ts will define TreeNode
  Variable,
} from "algo-lens-core";
import { asBooleanGroup, asTree, asValueGroup } from "../core/utils"; // Keep utils import for now

// Input type will be defined in types.ts
interface SameTreeInput {
  p: BinaryTreeNode | null; // Use BinaryTreeNode temporarily, will match types.ts later
  q: BinaryTreeNode | null;
}

// Core algorithm - with breakpoints added
export function isSameTreeAlgorithm(p: BinaryTreeNode | null, q: BinaryTreeNode | null): boolean {
  //#1 Check current nodes p and q.
  if (!p && !q) {
    //#2 Both nodes are null, they are the same. Return true.
    return true;
  }
  if (!p || !q) {
    //#3 One node is null, the other isn't. They are different. Return false.
    return false;
  }
  if (p.val !== q.val) {
    //#4 Node values are different. Return false.
    return false;
  }
  // Recursively check left and right subtrees.
  const leftSame = isSameTreeAlgorithm(p.left, q.left);
  const rightSame = isSameTreeAlgorithm(p.right, q.right);
  //#5 Combine results from subtrees. Return true if both are same, false otherwise.
  return leftSame && rightSame;
}


// Old step generation function (for reference)
export function sameTree_OldSteps(input: SameTreeInput): ProblemState[] {
  const { p, q } = input;
  const steps: ProblemState[] = [];

  function log(
    point: number,
    pNode: BinaryTreeNode | null,
    qNode: BinaryTreeNode | null,
    result?: boolean
  ) {
    let color: HighlightColor = "neutral";
    if (result === true) {
      color = "good";
    }
    if (result === false) {
      color = "bad";
    }
    const variables: Variable[] = [
      asTree("pTree", p, [{ node: pNode, color }]), // Visualization helpers might change
      asTree("qTree", q, [{ node: qNode, color }]),
    ];
    if (result !== undefined) {
      variables.push(asBooleanGroup("is node same?", { "return":result }));
    }
    steps.push({ variables, breakpoint: point });
  }

  // The recursive function inside the old step generator
  function isSameTreeRecursive(
    pNode: BinaryTreeNode | null,
    qNode: BinaryTreeNode | null
  ): boolean {
    log(1, pNode, qNode); // Breakpoint 1: Entry/Check nodes

    if (!pNode && !qNode) {
      log(2, pNode, qNode, true); // Breakpoint 2: Both null -> true
      return true;
    }
    if (!pNode || !qNode) {
      log(3, pNode, qNode, false); // Breakpoint 3: One null -> false
      return false;
    }
    if (pNode.val !== qNode.val) {
      log(4, pNode, qNode, false); // Breakpoint 4: Values differ -> false
      return false;
    }

    // Recursive calls (Breakpoints would be inside these calls)
    const leftSame = isSameTreeRecursive(pNode.left, qNode.left);
    const rightSame = isSameTreeRecursive(pNode.right, qNode.right);
    const result = leftSame && rightSame;
    log(5, pNode, qNode, result); // Breakpoint 5: Return combined result
    return result;
  }

  isSameTreeRecursive(p, q);
  return steps;
}

// Code string for display - breakpoints will be added here to match the algorithm
const code = `function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  //#1 Check current nodes p and q.
  if (!p && !q) {
    //#2 Both nodes are null, they are the same. Return true.
    return true;
  }
  if (!p || !q) {
    //#3 One node is null, the other isn't. They are different. Return false.
    return false;
  }
  if (p.val !== q.val) {
    //#4 Node values are different. Return false.
    return false;
  }
  // Recursively check left and right subtrees.
  const leftSame = isSameTree(p.left, q.left);
  const rightSame = isSameTree(p.right, q.right);
  //#5 Combine results from subtrees. Return true if both are same, false otherwise.
  return leftSame && rightSame;
}`;

const title = "Same Tree"; // Updated title slightly
// getInput is usually defined in testcase.ts
// const getInput = () => { ... };

// Problem definition will be moved to problem.ts
export const problem: Problem<SameTreeInput /*, ProblemState removed */ > = {
  title,
  emoji: '🌲',
  code, // Reference the code string defined above
  // func: sameTree_OldSteps, // func is usually removed, rely on generateSteps
  id: "same-tree",
  tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"], // Added more relevant tags
};
