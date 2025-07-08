## Approach: Dynamic Programming

We use dynamic programming to solve the Minimum Path Sum problem. We will modify the input grid in-place to store the minimum path sum to reach each cell.

1.  **Initialization:**
    *   The minimum path sum to reach the top-left cell (0, 0) is simply the value of the cell itself.
    *   Initialize the first row: For each cell in the first row (grid[0][col] where col > 0), the minimum path sum to reach it is the sum of the value of the cell and the minimum path sum to reach the cell to its left (grid[0][col-1]). We update `grid[0][col]` with this sum.
    *   Initialize the first column: For each cell in the first column (grid[row][0] where row > 0), the minimum path sum to reach it is the sum of the value of the cell and the minimum path sum to reach the cell above it (grid[row-1][0]). We update `grid[row][0]` with this sum.

2.  **Filling the DP Table:** Iterate through the rest of the grid starting from cell (1, 1). For each cell (row, col):
    *   The minimum path sum to reach this cell is the value of the cell plus the minimum of the minimum path sums to reach the cell above it (grid[row-1][col]) and the cell to its left (grid[row][col-1]).
    *   Update the current cell with this minimum path sum: `grid[row][col] = grid[row][col] + Math.min(grid[row-1][col], grid[row][col-1])`.

3.  **Result:** After filling the entire grid, the minimum path sum from the top-left to the bottom-right corner will be stored in the bottom-right cell of the grid (`grid[rows-1][cols-1]`).

## Data Structures

-   2D Array (Grid): Used to store the input values and also serves as the DP table to store the minimum path sums to reach each cell.

## Complexity

-   Time: O(M * N), where M is the number of rows and N is the number of columns in the grid. We visit each cell in the grid once to calculate the minimum path sum to reach it.
-   Space: O(1), as we are modifying the input grid in-place and not using any additional significant space.
