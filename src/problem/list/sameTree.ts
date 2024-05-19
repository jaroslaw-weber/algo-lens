import { Problem, ProblemState, TreeNode, Variable } from "../types";
import { asBooleanGroup, asTree, asValueGroup } from "../utils";

interface SameTreeInput {
  p: TreeNode | null;
  q: TreeNode | null;
}

export function sameTree(input: SameTreeInput): ProblemState[] {
  const { p, q } = input;
  const steps: ProblemState[] = [];

  function log(
    point: number,
    pNode: TreeNode | null,
    qNode: TreeNode | null,
    result: boolean
  ) {
    const variables: Variable[] = [
      asTree("pTree", p, [pNode]),
      asTree("qTree", q, [qNode]),
      asBooleanGroup("result", { result }),
    ];
    steps.push({ variables, breakpoint: point });
  }

  function isSameTree(
    p: TreeNode | null,
    q: TreeNode | null
  ): boolean {
    log(1, p, q, false);

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
  const p: TreeNode = {
    val: 1,
    id: "1",
    left: { 
      val: 2, 
      id: "2", 
      left: { val: 4, left: null, right: null, id: "4" },
      right: { val: 5, left: null, right: null, id: "5" }
    },
    right: { 
      val: 3, 
      id: "3", 
      left: { val: 6, left: null, right: null, id: "6" },
      right: { val: 7, left: null, right: null, id: "7" }
    },
  };
  const q: TreeNode  = {
    val: 1,
    id: "8",
    left: { 
      val: 2, 
      id: "9", 
      left: { val: 4, left: null, right: null, id: "11" },
      right: { val: 5, left: null, right: null, id: "12" }
    },
    right: { 
      val: 3, 
      id: "10", 
      left: { val: 6, left: null, right: null, id: "13" },
      // Make a small difference here
      right: { val: 8, left: null, right: null, id: "14" }
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
  id: "same-tree-check",
  tested: true,
  tags: ["tree"],
};
