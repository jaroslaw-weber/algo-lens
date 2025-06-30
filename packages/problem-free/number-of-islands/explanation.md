## Approach: Depth-First Search (DFS)

We can find the number of islands in the grid by using a technique called Depth-First Search (DFS). Imagine you are standing on a piece of land ('1'). You can explore all connected pieces of land by moving up, down, left, or right. Every time you start exploring from a new, unvisited piece of land, you've found a new island.

1.  **Initialize:** Start with a `numIslands` count of 0. This will keep track of how many islands we find.
2.  **Iterate Through the Grid:** Go through each cell in the grid one by one.
3.  **Find Unvisited Land:** If you find a cell that is '1' (land) and has not been visited yet:
    *   This means you've found a new island! Increment `numIslands`.
    *   Now, you need to explore the rest of this island to make sure you don't count its connected land pieces as new islands later. You do this using DFS.
4.  **Depth-First Search (DFS) Exploration:** When you start DFS from a land cell (i, j):
    *   **Mark as Visited:** Change the cell's value from '1' to something else (like '2' or '0') to mark it as visited. This is important so you don't get stuck in a loop or count the same land piece multiple times.
    *   **Explore Neighbors:** Check the cells above, below, left, and right of the current cell.
    *   **Recurse:** If a neighbor is within the grid boundaries and is also unvisited land ('1'), recursively call DFS on that neighbor. This continues the exploration deeper into the current island.
5.  **Repeat:** Continue iterating through the grid. If you encounter a cell that is '0' (water) or has already been visited ('2'), skip it.
6.  **Result:** After checking every cell in the grid, `numIslands` will hold the total number of distinct islands.

## Data Structures

-   2D Array (Grid): The input grid itself is used to represent the map and also to keep track of visited land cells by modifying its values.

## Complexity

-   Time: O(M * N), where M is the number of rows and N is the number of columns in the grid. In the worst case, we might visit each cell in the grid a constant number of times (when iterating and during DFS).
-   Space: O(M * N) in the worst case, due to the recursion depth of the DFS. In a grid filled with land, the recursion stack could go as deep as the total number of cells.
