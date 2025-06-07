## Problem

Given the `root` of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

A leaf node is a node with no children.

## Example

Input: `root = [3,9,20,null,null,15,7]`
Output: `3`
Explanation: The longest path is 3 -> 20 -> 7 (or 3 -> 20 -> 15), which has 3 nodes.

## Constraints

- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-100 <= Node.val <= 100`

## Edge Cases

- The tree is empty (`root` is null).
- The tree has only one node.
- The tree is skewed (e.g., a linked list).