// Finds all grid cells that can flow water to both the Pacific and Atlantic oceans.
export function pacificAtlanticWaterFlow(heights: number[][]): number[][] {
  // Get dimensions of the grid.
  const rows = heights.length;
  const cols = heights[0].length;
  // Create boolean matrices to track reachability from Pacific and Atlantic.
  const pacificReachable = new Array(rows)
    .fill(0)
    .map(() => new Array(cols).fill(false));
  const atlanticReachable = new Array(rows)
    .fill(0)
    .map(() => new Array(cols).fill(false));
  // Stores the coordinates of cells reachable by both oceans.
  const result: number[][] = [];
  //#1 Initialize dimensions, reachable matrices, and result array

  // Breadth-First Search function to mark reachable cells from ocean borders.
  function bfs(queue: number[][], reachable: boolean[][]) {
    // Directions for exploring neighbors (up, down, left, right).
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    //#2 Start BFS from the initial queue

    while (queue.length > 0) {
      // Dequeue the current cell.
      const [r, c] = queue.shift()!;
      //#3 Dequeue a cell

      // Explore neighbors.
      for (const [dr, dc] of directions) {
        const nr = r + dr; // Neighbor row
        const nc = c + dc; // Neighbor column
        //#4 Check a neighbor

        // Check if the neighbor is valid and can flow water *into* the current cell.
        if (
          nr >= 0 && // Within top boundary
          nr < rows && // Within bottom boundary
          nc >= 0 && // Within left boundary
          nc < cols && // Within right boundary
          !reachable[nr][nc] && // Not already visited for this ocean
          heights[nr][nc] >= heights[r][c] // Neighbor height allows flow to current cell
        ) {
          // Mark neighbor as reachable.
          reachable[nr][nc] = true;
          // Enqueue the neighbor for further exploration.
          queue.push([nr, nc]);
          //#5 Mark neighbor as reachable and enqueue
        }
      }
      //#6 Finished exploring neighbors for the current cell
    }
    //#7 BFS queue is empty
  }

  // Initialize queues for BFS starting from the borders.
  const pacificQueue: number[][] = [];
  const atlanticQueue: number[][] = [];

  // Add all cells adjacent to the Pacific (top and left borders) to the Pacific queue.
  for (let i = 0; i < rows; i++) {
    pacificQueue.push([i, 0]);
    pacificReachable[i][0] = true; // Mark border cell as reachable
    atlanticQueue.push([i, cols - 1]);
    atlanticReachable[i][cols - 1] = true; // Mark border cell as reachable
    //#8 Add left/right border cells to queues
  }
  // Add all cells adjacent to the Atlantic (bottom and right borders) to the Atlantic queue.
  for (let j = 0; j < cols; j++) {
    pacificQueue.push([0, j]);
    pacificReachable[0][j] = true; // Mark border cell as reachable
    atlanticQueue.push([rows - 1, j]);
    atlanticReachable[rows - 1][j] = true; // Mark border cell as reachable
    //#9 Add top/bottom border cells to queues
  }

  // Run BFS from Pacific borders.
  bfs(pacificQueue, pacificReachable);
  //#10 Completed Pacific BFS

  // Run BFS from Atlantic borders.
  bfs(atlanticQueue, atlanticReachable);
  //#11 Completed Atlantic BFS

  // Find cells reachable from both oceans.
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // If a cell is marked as reachable by both Pacific and Atlantic BFS...
      if (pacificReachable[i][j] && atlanticReachable[i][j]) {
        // Add its coordinates to the result list.
        result.push([i, j]);
        //#12 Found a cell reachable by both oceans
      }
    }
  }

  //#13 Return the list of cells reachable by both
  return result;
}
