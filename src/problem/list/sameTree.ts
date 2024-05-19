import { Problem, ProblemState, TreeNode, Variable } from "../types";
import { asTree, asValueGroup } from "../utils";

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
      asValueGroup("result", { result }, { min: 0, max: 1 }),
    ];
    steps.push({ variables, breakpoint: point });
  }

  function isSameTree(
    p: TreeNode | null,
    q: TreeNode | null,
    point: number
  ): boolean {
    log(point, p, q, false);

    if (!p && !q) {
      log(point, p, q, true);
      return true;
    }
    if (!p || !q) {
      log(point, p, q, false);
      return false;
    }
    if (p.val !== q.val) {
      log(point, p, q, false);
      return false;
    }

    const leftSame = isSameTree(p.left, q.left, point + 1);
    const rightSame = isSameTree(p.right, q.right, point + 1);
    const result = leftSame && rightSame;
    log(point, p, q, result);
    return result;
  }

  isSameTree(p, q, 1);
  return steps;
}

const code = `function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`;

const title = "Same Tree Check";
const getInput = () => {
  const p: TreeNode = {
    val: 1,
    id: "1",
    left: { val: 2, left: null, right: null, id: "2" },
    right: { val: 3, left: null, right: null, id: "3" },
  };
  const q = {
    val: 1,
    id: "4",
    left: { val: 2, left: null, right: null, id: "5" },
    right: { val: 3, left: null, right: null, id: "6" },
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
