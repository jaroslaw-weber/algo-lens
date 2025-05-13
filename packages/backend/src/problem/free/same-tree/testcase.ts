import { ProblemState, TestCase, BinaryTreeNode } from "algo-lens-core";
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
    input: [arrayToTree([1, 2, 3]), arrayToTree([1, 3, 2])],
    expected: false,
  },
  {
    input: [arrayToTree([1, 2, 3]), arrayToTree([1, 2, 3])],
    expected: true,
  },
  {
    // Changed from [1, 2] vs [1, null, 2] to slightly larger trees with different structure
    input: [arrayToTree([1, 2, 3, 4, 5]), arrayToTree([1, 2, 3, 4])],
    expected: false,
    isDefault: true,
  },
  {
    input: [arrayToTree([1, 2]), arrayToTree([1, 2, 3])],
    expected: false,
  },
];
