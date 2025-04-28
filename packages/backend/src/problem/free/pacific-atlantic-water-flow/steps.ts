
// Imports specific utility functions and type definitions from the relative paths
import { ProblemState } from "algo-lens-core"; // Removed Problem
import {
  asArray,
  as2dArray,
  // Removed unused imports asSimpleValue, asStringArray, asValueGroup
} from "../core/utils";
import { PacificAtlanticInput } from "./types"; // Import PacificAtlanticInput

// Removed PacificAtlanticInput interface definition

/**
 * Implements the pacificAtlanticWaterFlow algorithm which finds the cells that can flow to both the Pacific and Atlantic oceans.
 * @param p - The input parameters including a 2D array of heights.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function generateSteps(p: PacificAtlanticInput): ProblemState[] { // Renamed and Exported
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

// Removed code, title, getInput, Problem export
