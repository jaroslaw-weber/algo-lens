export const codeRaw = `function numIslands(grid: string[][]): number {
  const rowCount = grid.length;
  if (rowCount === 0) return 0;
  const colCount = grid[0].length;
  let numIslands = 0;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  // @breakpoint 1 - Initial state, before grid traversal

  function dfs(r: number, c: number) {
    // @breakpoint 2 - DFS called for cell (r, c)
    if (r < 0 || r >= rowCount || c < 0 || c >= colCount || grid[r][c] === '0' || grid[r][c] === '2') {
      // Base case: out of bounds, water, or already visited
      return;
    }

    grid[r][c] = '2'; // Mark current cell as visited (using '2')
    // @breakpoint 3 - Cell (r, c) marked as visited

    // Explore neighbors
    for (const [dr, dc] of directions) {
      // @breakpoint 4 - Exploring neighbor in direction (dr, dc)
      dfs(r + dr, c + dc);
      // @breakpoint 5 - Returned from DFS call for neighbor (r+dr, c+dc)
    }
    // @breakpoint 6 - Finished exploring neighbors of (r, c)
  }

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      // @breakpoint 7 - Checking cell (r, c) in the main loop
      if (grid[r][c] === '1') {
        // @breakpoint 8 - Found start of a new island at (r, c)
        numIslands++;
        dfs(r, c); // Start DFS from the new island cell
        // @breakpoint 9 - Returned from DFS for the island starting at (r, c)
      }
    }
  }

  // @breakpoint 10 - Finished grid traversal, final count obtained
  return numIslands;
}`;
