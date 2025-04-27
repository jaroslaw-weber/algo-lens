// Imports necessary types and utilities
import { cloneDeep } from "lodash"; // Use lodash cloneDeep for robust cloning
import { Problem, ProblemState, Variable } from "algo-lens-core";
import { as2dArray, asValueGroup } from "../core/utils"; // Removed unused deepClone2DArray import
import { numIslandsLogic } from "./numberOfIslands/code"; // Import the core logic

// Input interface remains the same
interface NumIslandsInput {
  grid: string[][];
}

interface NumIslandsInput {
  grid: string[][];
}

// Renamed function for visualization generation
export function numIslandsVisualizer(p: NumIslandsInput): ProblemState[] {
  const { grid } = p;

  // Call the core logic function with a deep clone to get the actual count without modifying the original grid needed for visualization
  const gridForCounting = cloneDeep(grid);
  const totalIslandCount = numIslandsLogic(gridForCounting);

  // Use a separate deep clone (using lodash cloneDeep) for visualization steps
  const clonedGrid = cloneDeep(grid); // Use cloneDeep here as well
  const steps: ProblemState[] = [];
  // Island count is determined by totalIslandCount, not incremented here.
  const rowCount = clonedGrid.length;
  const colCount = clonedGrid[0] ? clonedGrid[0].length : 0; // Handle empty grid case
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  function log(point: number, i?: number, j?: number) {
    console.log("log", point, JSON.stringify(clonedGrid));
    const v: Variable[] = [];
    const step: ProblemState = {
      variables: v,
      breakpoint: point,
    };
    // Log the state of the visualization grid
    v.push(as2dArray("grid", clonedGrid, [{ r: i, c: j }]));
    // Log the total island count obtained from numIslandsLogic, using standardized key 'totalIslands'
    v.push(asValueGroup("Counter", { totalIslands: totalIslandCount }, { max: (rowCount * colCount) / 2, min: 0 }));
    steps.push(step);
  }
  log(1); // Initial state log

  function dfs(i: number, j: number) {
    log(2, i, j);
    if (i < 0 || i >= rowCount || j < 0 || j >= colCount || clonedGrid[i][j] !== '1') {
      return;
    }
    clonedGrid[i][j] = '2'; // Mark the cell as visited ('2') on the cloned grid for visualization
    log(5, i, j); // Log after marking as visited
    for (const [dx, dy] of directions) {
      log(6, i + dx, j + dy); // Log before recursive call
      dfs(i + dx, j + dy);
      log(7, i + dx, j + dy); // Log after recursive call returns
    }
  }

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      log(8, i, j); // Log at the start of each cell check
      if (clonedGrid[i][j] === '1') { // Check the cloned grid
        log(9, i, j); // Log when a new island starting point is found
        // Do not increment island count here; dfs only visualizes the traversal
        dfs(i, j); // Call dfs to visualize traversal and mark visited cells on the cloned grid
      }
    }
  }

  console.log("steps", steps);
  log(10); // Final state log (optional, using a new breakpoint number)

  console.log("steps", steps);
  return steps;
}


// The 'code' field now holds the source code of the numIslandsLogic function
const code = `function numIslandsLogic(grid: string[][]): number {
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
}`; // Note: Removed the export comment from the string

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

// Export the complete problem setup including the input function, the visualization function, and other metadata
export const numIslandsProblem: Problem<NumIslandsInput, ProblemState> = {
  title,
  code, // Updated code string
  getInput,
  func: numIslandsVisualizer, // Updated function reference
  id: "number-of-islands",
  tags: ["graph"],
};
