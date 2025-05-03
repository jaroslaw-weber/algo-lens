import { TreeNode } from './types';

/**
 * Creates a binary tree from an array using level-order traversal (null indicates no node).
 * Example: [1, 2, 3, null, 4, null, 5] represents a tree.
 * @param values Array of numbers or nulls representing the tree structure.
 * @returns The root TreeNode or null if the input array is empty or starts with null.
 */
export function createTree(values: (number | null)[]): TreeNode | null {
  if (!values || values.length === 0 || values[0] === null) {
    return null;
  }

  const root = new TreeNode(values[0]);
  const queue: (TreeNode | null)[] = [root];
  let i = 1; // Start from the second element for children

  while (i < values.length) {
    const current = queue.shift(); // Get the next node to process

    // Skip if the current node is null (shouldn't happen with proper queue management, but safe)
    if (!current) continue;

    // Process left child
    if (i < values.length) {
      const leftVal = values[i++];
      if (leftVal !== null) {
        current.left = new TreeNode(leftVal);
        queue.push(current.left);
      } else {
        current.left = null;
      }
    }

    // Process right child
    if (i < values.length) {
      const rightVal = values[i++];
      if (rightVal !== null) {
        current.right = new TreeNode(rightVal);
        queue.push(current.right);
      } else {
        current.right = null;
      }
    }
  }

  return root;
}

/**
 * Converts a binary tree to an array using level-order traversal.
 * This is useful for comparing tree structures in tests.
 * @param root The root TreeNode of the tree.
 * @returns An array of numbers or nulls representing the tree.
 */
export function treeToArray(root: TreeNode | null): (number | null)[] {
  if (!root) {
    return [];
  }

  const result: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];
  let lastNonNullIndex = 0; // To trim trailing nulls

  while (queue.length > 0) {
    const node = queue.shift();

    if (node) {
      result.push(node.val);
      // Update the index of the last seen non-null value
      lastNonNullIndex = result.length -1;
      queue.push(node.left);
      queue.push(node.right);
    } else {
      result.push(null);
      // Don't add children of null nodes
    }
  }

  // Trim trailing nulls from the result array for a cleaner representation
  return result.slice(0, lastNonNullIndex + 1);
}
