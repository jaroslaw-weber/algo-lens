import { ProblemState, TestCase } from "@algolens/core/src/types";

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
    input: buildTree([4, 2, 7, 1, 3, 6, 9]),
    expected: buildTree([4, 7, 2, 9, 6, 3, 1]),
    name: "Example 1",
    description: "Inverting a complete binary tree.",
  },
  {
    input: buildTree([2, 1, 3]),
    expected: buildTree([2, 3, 1]),
    name: "Example 2",
    description: "Inverting a smaller binary tree.",
  },
  {
    input: buildTree([]),
    expected: buildTree([]),
    name: "Example 3",
    description: "Inverting an empty tree.",
  },
  {
    input: buildTree([1, null, 2]),
    expected: buildTree([1, 2, null]),
    name: "Example 4",
    description: "Inverting a tree with only a right child.",
  },
  {
    input: buildTree([1]),
    expected: buildTree([1]),
    name: "Example 5",
    description: "Inverting a single-node tree.",
  },
];
