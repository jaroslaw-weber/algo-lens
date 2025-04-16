import {
  HighlightColor,
  Problem,
  ProblemState,
  BinaryTreeNode,
  Variable,
} from "algo-lens-core";
import { asBooleanGroup, asTree, asValueGroup } from "algo-lens-core/src/utils";

interface SameTreeInput {
  p: BinaryTreeNode | null;
  q: BinaryTreeNode | null;
}

export function sameTree(input: SameTreeInput): ProblemState[] {
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
      asTree("pTree", p, [{ node: pNode, color }]),
      asTree("qTree", q, [{ node: qNode, color }]),
    ];
    if (result !== undefined) {
      variables.push(asBooleanGroup("is node same?", { "return":result }));
    }
    steps.push({ variables, breakpoint: point });
  }

  function isSameTree(
    p: BinaryTreeNode | null,
    q: BinaryTreeNode | null
  ): boolean {
    log(1, p, q);

    if (!p && !q) {
      log(2, p, q, true);
      return true;
    }
    if (!p || !q) {
      log(3, p, q, false);
      return false;
    }
    if (p.val !== q.val) {
      log(4, p, q, false);
      return false;
    }

    const leftSame = isSameTree(p.left, q.left);
    const rightSame = isSameTree(p.right, q.right);
    const result = leftSame && rightSame;
    log(5, p, q, result);
    return result;
  }

  isSameTree(p, q);
  return steps;
}

const code = `function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
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
  const result = isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  //#5
  return result; 
}`;

const title = "Same Tree Check";
const getInput = () => {
  const p: BinaryTreeNode = {
    val: 1,
    left: {
      val: 2,
      left: { val: 4, left: null, right: null },
      right: { val: 5, left: null, right: null },
    },
    right: {
      val: 3,
      left: { val: 6, left: null, right: null },
      right: { val: 7, left: null, right: null },
    },
  };
  const q: BinaryTreeNode = {
    val: 1,
    left: {
      val: 2,
      left: { val: 4, left: null, right: null },
      right: { val: 5, left: null, right: null },
    },
    right: {
      val: 3,
      left: { val: 6, left: null, right: null },
      // Make a small difference here
      right: { val: 8, left: null, right: null },
    },
  };
  const result = { p, q };
  return result;
};

export const sameTreeProblem: Problem<SameTreeInput, ProblemState> = {
  title,
  code,
  getInput,
  func: sameTree,
  id: "same-tree",
  tested: true,
  tags: ["tree"],
};
