export const codeRaw = `function pacificAtlantic(heights: number[][]): number[][] {
  const rows = heights.length;
  if (rows === 0) return [];
  const cols = heights[0].length;
  if (cols === 0) return [];

  const pacificReachable = Array.from({ length: rows }, () => Array(cols).fill(false));
  const atlanticReachable = Array.from({ length: rows }, () => Array(cols).fill(false));
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  const result: number[][] = [];
  // @breakpoint 1 - Initialization complete

  function dfs(r: number, c: number, reachable: boolean[][]) {
    // @breakpoint dfs_start - DFS called for cell (r, c)
    reachable[r][c] = true;
    // @breakpoint dfs_marked - Cell (r, c) marked as reachable

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      // @breakpoint dfs_check_neighbor - Checking neighbor (nr, nc)
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || reachable[nr][nc] || heights[nr][nc] < heights[r][c]) {
        // @breakpoint dfs_skip_neighbor - Skipping neighbor (nr, nc)
        continue;
      }
      // @breakpoint dfs_call_neighbor - Calling DFS for neighbor (nr, nc)
      dfs(nr, nc, reachable);
      // @breakpoint dfs_return_neighbor - Returned from DFS call for neighbor (nr, nc)
    }
    // @breakpoint dfs_end - Finished exploring neighbors of (r, c)
  }

  // Start DFS from Pacific border cells
  for (let r = 0; r < rows; r++) {
    // @breakpoint 2 - Starting Pacific DFS from row r, col 0
    dfs(r, 0, pacificReachable);
  }
  for (let c = 1; c < cols; c++) {
    // @breakpoint 3 - Starting Pacific DFS from row 0, col c
    dfs(0, c, pacificReachable);
  }
  // @breakpoint 4 - Pacific DFS complete

  // Start DFS from Atlantic border cells
  for (let r = 0; r < rows; r++) {
    // @breakpoint 5 - Starting Atlantic DFS from row r, col cols-1
    dfs(r, cols - 1, atlanticReachable);
  }
  for (let c = 0; c < cols - 1; c++) {
    // @breakpoint 6 - Starting Atlantic DFS from row rows-1, col c
    dfs(rows - 1, c, atlanticReachable);
  }
  // @breakpoint 7 - Atlantic DFS complete

  // Collect results
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // @breakpoint 8 - Checking cell (r, c) for dual reachability
      if (pacificReachable[r][c] && atlanticReachable[r][c]) {
        // @breakpoint 9 - Cell (r, c) is reachable by both, adding to result
        result.push([r, c]);
      }
    }
  }

  // @breakpoint 10 - Result collection complete
  return result;
}`;
