
// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asValueGroup,
} from "../utils";

// Defines the interface for the input expected by the numIslands function
interface NumIslandsInput {
  grid: string[][];
}

/**
 * Implements the numIslands algorithm which finds the number of distinct islands in a given grid.
 * @param p - The input parameters including a 2D grid of strings representing land ('1') and water ('0').
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function numIslands(p: NumIslandsInput): ProblemState[] {
  const { grid } = p;
  const steps: ProblemState[] = [];
  let numIslands = 0;

  // Helper function to create and log each step's computational state
  function logStep(point: number, islandCount?: number, gridSnapshot?: string[][]) {
    const step: ProblemState = {
      variables: [as2dArray("grid", grid,[])], //, gridSnapshot)],
      breakpoint: point, 
    };
    if (islandCount !== undefined) {
      step.variables.push(...asSimpleValue({ "Num Islands": islandCount }));
    }
    steps.push(step);
  }

  // Initial state log before the loop starts
  logStep(1);

  // Iterate over the grid to find islands
  for (let i = 0; i < grid.length; i++) { //#2
    for (let j = 0; j < grid[0].length; j++) { //#3
      if (grid[i][j] === '1') {
        numIslands++;
        dfs(grid, i, j); //#4
        logStep(5, numIslands, cloneGrid(grid));
      }
    }
  }

  // Logs the final state with the total number of islands
  logStep(6, numIslands);

  return steps;
}

// Helper function to clone the grid for logging
function cloneGrid(grid: string[][]): string[][] {
  return grid.map(row => [...row]);
}

// Depth-First Search (DFS) function to mark an island as visited
function dfs(grid: string[][], i: number, j: number) {
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] !== '1') {
    return;
  }
  grid[i][j] = '0'; //#7 Mark the cell as visited
  dfs(grid, i - 1, j); //#8 Explore top cell
  dfs(grid, i + 1, j); //#9 Explore bottom cell
  dfs(grid, i, j - 1); //#10 Explore left cell
  dfs(grid, i, j + 1); //#11 Explore right cell
}

// Example implementation of the numIslands function for demonstration and testing
const code = `function numIslands(grid: string[][]): number {
  let numIslands = 0;

  //#1 Iterate over the grid to find islands
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        //#2 Found a land cell, increment island count and mark the island as visited
        numIslands++;
        dfs(grid, i, j);
      }
    }
  }

  //#3 Return the total number of islands
  return numIslands;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Number of Islands";
const getInput = () => ({
  grid: [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const numIslandsProblem: Problem<NumIslandsInput, ProblemState> = {
  title,
  code,
  getInput,
  func: numIslands,
  id: "num-islands",
};
