## Approach

We use a recursive approach to invert the binary tree. The idea is to swap the left and right children of each node, starting from the root and recursively doing the same for the children.

1.  **Base Case:** If the current node is null, return null.
2.  **Recursive Step:**
    *   Recursively invert the left subtree.
    *   Recursively invert the right subtree.
    *   Swap the left and right children of the current node.
    *   Return the current node.

## Data Structures

-   Binary Tree: The problem operates on a binary tree data structure.

## Complexity

-   Time: O(N), where N is the number of nodes in the tree, as we visit each node once.
-   Space: O(H), where H is the height of the tree, due to the recursion stack. In the worst case (a skewed tree), this can be O(N).
