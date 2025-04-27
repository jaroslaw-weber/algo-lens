function numIslandsLogic(grid: string[][]): number {
  if (!grid || grid.length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  let islandCount = 0;

  const dfs = (row: number, col: number) => {
    if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
      return;
    }

    // Mark the cell as visited by changing '1' to '0'
    grid[row][col] = '0';

    // Explore adjacent cells
    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '1') {
        islandCount++;
        dfs(row, col);
      }
    }
  }

  return islandCount;
}

// Export the function for use in other modules
export { numIslandsLogic };
