
// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState } from "../core/types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../core/utils";

// Defines the interface for the input expected by the pacificAtlanticWaterFlow function
interface PacificAtlanticInput {
  heights: number[][];
}

/**
 * Implements the pacificAtlanticWaterFlow algorithm which finds the cells that can flow to both the Pacific and Atlantic oceans.
 * @param p - The input parameters including a 2D array of heights.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function pacificAtlanticWaterFlow(p: PacificAtlanticInput): ProblemState[] {
  const { heights } = p;
  const rows = heights.length;
  const cols = heights[0].length;
  const pacificQueue: [number, number][] = [];
  const atlanticQueue: [number, number][] = [];
  const pacificVisited: boolean[][] = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const atlanticVisited: boolean[][] = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const result: [number, number][] = [];

  const steps: ProblemState[] = [];
  let step = 0;

  // Helper function to create and log each step's computational state
  function log(point: number, queue: [number, number][] = [], visited: boolean[][] = []) {
    const step: ProblemState = {
      variables: [
        as2dArray("heights", heights, []),
        asArray("queue", queue.map(([r, c]) => `${r},${c}`)),
        as2dArray("visited", visited, []),
      ],
      breakpoint: point,
    };
    steps.push(step);
  }

  // Initial state log before the loop starts
  log(step++);

  // Add all cells on the Pacific coast to the queue
  for (let i = 0; i < rows; i++) {
    pacificQueue.push([i, 0]);
    pacificVisited[i][0] = true;
  }
  for (let i = 1; i < cols; i++) {
    pacificQueue.push([0, i]);
    pacificVisited[0][i] = true;
  }

  log(step++);

  // Perform BFS from the Pacific coast
  while (pacificQueue.length > 0) {
    const [r, c] = pacificQueue.shift();
    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !pacificVisited[nr][nc] && heights[nr][nc] >= heights[r][c]) {
        pacificVisited[nr][nc] = true;
        pacificQueue.push([nr, nc]);
      }
    }
    log(step++);
  }

  // Add all cells on the Atlantic coast to the queue
  for (let i = 0; i < rows; i++) {
    atlanticQueue.push([i, cols - 1]);
    atlanticVisited[i][cols - 1] = true;
  }
  for (let i = 0; i < cols - 1; i++) {
    atlanticQueue.push([rows - 1, i]);
    atlanticVisited[rows - 1][i] = true;
  }

  log(step++);

  // Perform BFS from the Atlantic coast
  while (atlanticQueue.length > 0) {
    const [r, c] = atlanticQueue.shift();
    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !atlanticVisited[nr][nc] && heights[nr][nc] >= heights[r][c]) {
        atlanticVisited[nr][nc] = true;
        atlanticQueue.push([nr, nc]);
      }
    }
    log(step++);
  }

  // Find the cells that can flow to both oceans
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (pacificVisited[i][j] && atlanticVisited[i][j]) {
        result.push([i, j]);
      }
    }
  }

  log(step++, [], []);

  return steps;
}

// Example implementation of the pacificAtlanticWaterFlow function for demonstration and testing
const code = `function pacificAtlanticWaterFlow(heights: number[][]): number[][] {
  // ...
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Pacific Atlantic Water Flow";
const getInput = () => ({
  heights: [
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4],
  ],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const pacificAtlanticWaterFlowProblem: Problem<PacificAtlanticInput, ProblemState> = {
  title,
  code,
  getInput,
  func: pacificAtlanticWaterFlow,
  id: "pacific-atlantic-water-flow",
};
