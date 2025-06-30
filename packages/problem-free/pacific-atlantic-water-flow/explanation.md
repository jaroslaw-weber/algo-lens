## Approach: Two Breadth-First Searches (BFS)

This problem asks us to find the cells in a grid of heights from which water can flow to both the Pacific and Atlantic oceans. Water can only flow from a cell to an adjacent cell if the adjacent cell's height is less than or equal to the current cell's height.

Instead of trying to simulate water flowing *from* every cell *to* the oceans (which would be complicated), we can think about it in reverse: which cells can be *reached* by water starting *from* the oceans? If a cell can be reached by water starting from the Pacific coast AND can be reached by water starting from the Atlantic coast, then water can flow from that cell to both oceans.

We can use Breadth-First Search (BFS) for this. BFS is like exploring a maze level by level.

1.  **Initialize:**
    *   Create two grids of the same size as the input `heights` grid, one for the Pacific (`pacificReachable`) and one for the Atlantic (`atlanticReachable`). These grids will keep track of whether a cell can be reached by water from the respective ocean. Initialize all cells in both grids to `false`.
    *   Create two queues, one for the Pacific (`pacificQueue`) and one for the Atlantic (`atlanticQueue`). These queues will store the cells we need to visit during our BFS.
2.  **Start BFS from Coasts:**
    *   Add all cells on the Pacific coast (top row and leftmost column) to the `pacificQueue` and mark them as `true` in `pacificReachable`. These are the starting points for water from the Pacific.
    *   Add all cells on the Atlantic coast (bottom row and rightmost column) to the `atlanticQueue` and mark them as `true` in `atlanticReachable`. These are the starting points for water from the Atlantic.
3.  **BFS for Pacific:** Perform a BFS starting from the `pacificQueue`.
    *   While the `pacificQueue` is not empty, take a cell (r, c) out of the queue.
    *   Check its neighbors (up, down, left, right).
    *   If a neighbor (nr, nc) is within the grid, has not been visited from the Pacific yet (`pacificReachable[nr][nc]` is `false`), AND its height is greater than or equal to the current cell's height (`heights[nr][nc] >= heights[r][c]`) (because water flows from higher to lower or equal height), then:
        *   Mark the neighbor as reachable from the Pacific (`pacificReachable[nr][nc] = true`).
        *   Add the neighbor to the `pacificQueue` to explore its neighbors later.
4.  **BFS for Atlantic:** Perform a similar BFS starting from the `atlanticQueue` to fill the `atlanticReachable` grid. The logic is the same, but we are checking reachability from the Atlantic coast.
5.  **Find Common Cells:** After both BFS traversals are complete, iterate through every cell (r, c) in the grid.
    *   If a cell is marked as reachable in *both* `pacificReachable[r][c]` and `atlanticReachable[r][c]`, it means water can flow from this cell to both oceans.
    *   Add the coordinates of these common cells to your `result` list.
6.  **Result:** The `result` list contains the coordinates of all cells from which water can flow to both the Pacific and Atlantic oceans.

## Data Structures

-   2D Array (Grid): The input `heights` grid.
-   2D Boolean Arrays: `pacificReachable` and `atlanticReachable` to track visited cells from each ocean.
-   Queues: `pacificQueue` and `atlanticQueue` to manage cells to visit during BFS.

## Complexity

-   Time: O(M * N), where M is the number of rows and N is the number of columns in the grid. We visit each cell a constant number of times during the two BFS traversals.
-   Space: O(M * N), to store the two visited grids and the queues (in the worst case, the queues could hold up to M * N cells).
