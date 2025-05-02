import { TestCase, BinaryTreeNode } from "algo-lens-core";

// Define the input type based on the function signature in code.ts
interface SameTreeInput {
  p: BinaryTreeNode | null;
  q: BinaryTreeNode | null;
}

// Define the output type based on the expected return value of the core logic
type SameTreeOutput = boolean;

// Helper function to create a simple binary tree node
function createTreeNode(val: number, left: BinaryTreeNode | null = null, right: BinaryTreeNode | null = null): BinaryTreeNode {
  return { val, left, right };
}

// Define the test cases for the isSameTree function
export const testcases: Array<TestCase<SameTreeInput, SameTreeOutput>> = [
  {
    input: {
      p: createTreeNode(1, createTreeNode(2), createTreeNode(3)),
      q: createTreeNode(1, createTreeNode(2), createTreeNode(3)),
    },
    expected: true,
    description: "Identical simple trees"
  },
  {
    input: {
      p: createTreeNode(1, createTreeNode(2), null),
      q: createTreeNode(1, null, createTreeNode(2)),
    },
    expected: false,
    description: "Different structure"
  },
  {
    input: {
      p: createTreeNode(1, createTreeNode(2), createTreeNode(1)),
      q: createTreeNode(1, createTreeNode(1), createTreeNode(2)),
    },
    expected: false,
    description: "Same structure, different values"
  },
  {
    input: {
      p: null,
      q: null,
    },
    expected: true,
    description: "Both trees are null"
  },
  {
    input: {
      p: createTreeNode(1),
      q: null,
    },
    expected: false,
    description: "One tree is null, the other is not"
  },
    {
    input: {
      p: createTreeNode(1, createTreeNode(2, createTreeNode(4), createTreeNode(5)), createTreeNode(3)),
      q: createTreeNode(1, createTreeNode(2, createTreeNode(4), createTreeNode(5)), createTreeNode(3)),
    },
    expected: true,
    description: "Identical deeper trees"
  },
  {
    input: {
      p: createTreeNode(1, createTreeNode(2, createTreeNode(4), createTreeNode(5)), createTreeNode(3)),
      q: createTreeNode(1, createTreeNode(2, createTreeNode(4), null), createTreeNode(3)),
    },
    expected: false,
    description: "Different leaf nodes in deeper trees"
  }
];
