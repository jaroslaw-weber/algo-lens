import { ProblemState, TestCase } from "algo-lens-core";
import { BinaryTree } from "./types";

const buildTree = (nodes: (number | null)[]): BinaryTree => {
  if (!nodes || nodes.length === 0 || nodes[0] === null) {
    return null;
  }

  const root: BinaryTree = { val: nodes[0], left: null, right: null };
  const queue: BinaryTree[] = [root];
  let i = 1;

  while (queue.length > 0 && i < nodes.length) {
    const current = queue.shift();

    if (current) {
      if (nodes[i] !== null) {
        current.left = { val: nodes[i]!, left: null, right: null };
        queue.push(current.left);
      }
      i++;

      if (i < nodes.length && nodes[i] !== null) {
        current.right = { val: nodes[i]!, left: null, right: null };
        queue.push(current.right);
      }
      i++;
    }
  }
  return root;
};

export const testcases: TestCase<BinaryTree, ProblemState>[] = [
  {
    input: {
      root: buildTree([4, 2, 7, 1, 3, 6, 9]),
    },
    output: buildTree([4, 7, 2, 9, 6, 3, 1]),
  },
  {
    input: {
      root: buildTree([2, 1, 3]),
    },
    output: buildTree([2, 3, 1]),
  },
  {
    input: {
      root: buildTree([]),
    },
    output: buildTree([]),
  },
  {
    input: {
      root: buildTree([1, null, 2]),
    },
    output: buildTree([1, 2, null]),
  },
  {
    input: {
      root: buildTree([1]),
    },
    output: buildTree([1]),
  },
];
