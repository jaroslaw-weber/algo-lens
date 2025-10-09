import { TestCase } from "@algolens/core/src/types";

import { Input, Output, TreeNode } from "./types";

// Helper function to build a binary tree from an array representation
function buildTree(nodes: (number | null)[]): TreeNode | null {
  if (!nodes || nodes.length === 0 || nodes[0] === null) {
    return null;
  }

  const root = new TreeNode(nodes[0]);
  const queue: (TreeNode | null)[] = [root];
  let i = 1;

  while (queue.length > 0 && i < nodes.length) {
    const current = queue.shift();

    if (current) {
      // Left child
      if (nodes[i] !== null && nodes[i] !== undefined) {
        current.left = new TreeNode(nodes[i]!);
        queue.push(current.left);
      } else {
        current.left = null;
      }
      i++;

      // Right child
      if (i < nodes.length && nodes[i] !== null && nodes[i] !== undefined) {
        current.right = new TreeNode(nodes[i]!);
        queue.push(current.right);
      } else {
        current.right = null;
      }
      i++;
    }
  }
  return root;
}

export const testcases: TestCase<Input, Output>[] = [
  {
    name: "Example case from problem description",
    description: "Example case from problem description",
    input: { root: buildTree([3, 9, 20, null, null, 15, 7]) },
    expected: 3,
  },
  {
    name: "Empty tree",
    description: "Empty tree",
    input: { root: buildTree([]) },
    expected: 0,
  },
  {
    name: "Single node tree",
    description: "Single node tree",
    input: { root: buildTree([1]) },
    expected: 1,
  },
  {
    name: "Skewed tree (left)",
    description: "Skewed tree (left)",
    input: { root: buildTree([1, 2, null, 3, null, 4]) },
    expected: 4,
  },
  {
    name: "Skewed tree (right)",
    description: "Skewed tree (right)",
    input: { root: buildTree([1, null, 2, null, 3, null, 4]) },
    expected: 4,
  },
  {
    name: "Complete binary tree",
    description: "Complete binary tree",
    input: { root: buildTree([1, 2, 3, 4, 5, 6, 7]) },
    expected: 3,
  },
  {
    name: "Tree with nulls in between",
    description: "Tree with nulls in between",
    input: { root: buildTree([1, 2, 3, null, 4, null, 5]) },
    expected: 3,
  },
];
