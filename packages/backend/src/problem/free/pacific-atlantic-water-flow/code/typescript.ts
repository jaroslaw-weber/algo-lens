// Note: The original code variable was incomplete ('// ...').
// Providing a placeholder or a more complete BFS/DFS implementation might be necessary
// depending on how this 'code' variable is used. For now, using the placeholder.
export const code = `function pacificAtlanticWaterFlow(heights: number[][]): number[][] {
  const rows = heights.length;
  const cols = heights[0].length;
  const pacificReachable = new Array(rows).fill(0).map(() => new Array(cols).fill(false));
  const atlanticReachable = new Array(rows).fill(0).map(() => new Array(cols).fill(false));
  const result: number[][] = [];

  function bfs(queue: number[][], reachable: boolean[][]) {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !reachable[nr][nc] && heights[nr][nc] >= heights[r][c]) {
          reachable[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
  }

  const pacificQueue: number[][] = [];
  const atlanticQueue: number[][] = [];

  for (let i = 0; i < rows; i++) {
    pacificQueue.push([i, 0]);
    pacificReachable[i][0] = true;
    atlanticQueue.push([i, cols - 1]);
    atlanticReachable[i][cols - 1] = true;
  }
  for (let j = 0; j < cols; j++) {
    pacificQueue.push([0, j]);
    pacificReachable[0][j] = true;
    atlanticQueue.push([rows - 1, j]);
    atlanticReachable[rows - 1][j] = true;
  }

  bfs(pacificQueue, pacificReachable);
  bfs(atlanticQueue, atlanticReachable);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (pacificReachable[i][j] && atlanticReachable[i][j]) {
        result.push([i, j]);
      }
    }
  }

  return result;
}`;
