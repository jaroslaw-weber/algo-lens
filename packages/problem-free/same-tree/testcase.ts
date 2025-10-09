import {
  ProblemState,
  TestCase,
  BinaryTreeNode,
} from "@algolens/core/src/types";

import { SameTreeInput } from "./types";

function createBinaryTreeNode(value: number | null): BinaryTreeNode {
  return {
    val: value!,
    left: null,
    right: null,
  };
}

function arrayToTree(arr: (number | null)[] | null): BinaryTreeNode | null {
  if (arr === null || arr.length === 0) {
    return null;
  }

  const root = createBinaryTreeNode(arr[0]);
  const queue: (BinaryTreeNode | null)[] = [root];
  let i = 1;

  while (queue.length > 0 && i < arr.length) {
    const current = queue.shift();

    if (current != null) {
      if (arr[i] !== null) {
        current.left = createBinaryTreeNode(arr[i]);
        queue.push(current.left);
      }
      i++;

      if (i < arr.length && arr[i] !== null) {
        current.right = createBinaryTreeNode(arr[i]);
        queue.push(current.right);
      }
      i++;
    }
  }

  return root;
}

export const testcases: TestCase<SameTreeInput, ProblemState>[] = [
  {
    name: "Different Structure",
    description: "Trees with different structures.",
    input: [arrayToTree([1, 2, 3]), arrayToTree([1, 3, 2])],
    expected: false,
  },
  {
    name: "Identical Trees",
    description: "Two identical binary trees.",
    input: [arrayToTree([1, 2, 3]), arrayToTree([1, 2, 3])],
    expected: true,
  },
  {
    // Changed from [1, 2] vs [1, null, 2] to slightly larger trees with different structure
    name: "Default Different Size",
    description: "Two trees with different sizes, one larger than the other.",
    input: [arrayToTree([1, 2, 3, 4, 5]), arrayToTree([1, 2, 3, 4])],
    expected: false,
    isDefault: true,
  },
  {
    name: "One Tree Larger",
    description: "One tree is larger than the other.",
    input: [arrayToTree([1, 2]), arrayToTree([1, 2, 3])],
    expected: false,
  },
];
