import { ProblemState, TestCase } from "algo-lens-core";
import { BinaryTree, TreeNode } from "./types";

const buildTree = (nodes: (number | null)[]): BinaryTree => {
  if (!nodes || nodes.length === 0 || nodes[0] === null) {
    return null;
  }

  const root: TreeNode = { val: nodes[0], left: null, right: null };
  const queue: TreeNode[] = [root];
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

export const testcases: TestCase<[BinaryTree, BinaryTree], boolean>[] = [
  {
    input: [buildTree([3, 4, 5, 1, 2]), buildTree([4, 1, 2])],
    expected: true,
    name: "Example 1",
    description: "Basic case where subRoot is a direct subtree.",
  },
  {
    input: [
      buildTree([3, 4, 5, 1, 2, null, null, null, null, 0]),
      buildTree([4, 1, 2]),
    ],
    expected: false,
    name: "Example 2",
    description: "subRoot is not a subtree due to extra node.",
  },
  {
    input: [buildTree([1, 2, 3]), buildTree([1, 2, 3])],
    expected: true,
    name: "Identical Trees",
    description: "Root tree is identical to subRoot tree.",
  },
  {
    input: [buildTree([1]), buildTree([1])],
    expected: true,
    name: "Single Node Trees",
    description: "Both trees have a single identical node.",
  },
  {
    input: [buildTree([1, 2]), buildTree([1])],
    expected: true,
    name: "Subtree is Root",
    description: "subRoot is the root of the main tree.",
  },
  {
    input: [buildTree([1]), buildTree([2])],
    expected: false,
    name: "Different Single Nodes",
    description: "Both trees have a single node, but values differ.",
  },
  {
    input: [buildTree([1, 2, 3]), buildTree([2, 3])],
    expected: false,
    name: "Partial Match",
    description: "subRoot is partially present but not a complete subtree.",
  },
  {
    input: [buildTree([1, null, 2, 3]), buildTree([2, 3])],
    expected: true,
    name: "Subtree on Right",
    description: "subRoot is on the right side of the main tree.",
  },
  {
    input: [buildTree([1, 2, null, 3]), buildTree([2, 3])],
    expected: true,
    name: "Subtree on Left",
    description: "subRoot is on the left side of the main tree.",
  },
  {
    input: [buildTree([]), buildTree([])],
    expected: true,
    name: "Empty Trees",
    description: "Both trees are empty.",
  },
  {
    input: [buildTree([1]), buildTree([])],
    expected: false,
    name: "Root exists, subRoot empty",
    description: "Root tree exists, subRoot is empty.",
  },
  {
    input: [buildTree([]), buildTree([1])],
    expected: false,
    name: "Root empty, subRoot exists",
    description: "Root tree is empty, subRoot exists.",
  },
];
