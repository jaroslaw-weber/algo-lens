import { TestCase } from "algo-lens-core";
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
    id: 0,
    description: "Example case from problem description",
    input: { root: buildTree([3, 9, 20, null, null, 15, 7]) },
    expected: 3,
  },
  {
    id: 1,
    description: "Empty tree",
    input: { root: buildTree([]) },
    expected: 0,
  },
  {
    id: 2,
    description: "Single node tree",
    input: { root: buildTree([1]) },
    expected: 1,
  },
  {
    id: 3,
    description: "Skewed tree (left)",
    input: { root: buildTree([1, 2, null, 3, null, 4]) },
    expected: 4,
  },
  {
    id: 4,
    description: "Skewed tree (right)",
    input: { root: buildTree([1, null, 2, null, 3, null, 4]) },
    expected: 4,
  },
  {
    id: 5,
    description: "Complete binary tree",
    input: { root: buildTree([1, 2, 3, 4, 5, 6, 7]) },
    expected: 3,
  },
  {
    id: 6,
    description: "Tree with nulls in between",
    input: { root: buildTree([1, 2, 3, null, 4, null, 5]) },
    expected: 3,
  },
];
