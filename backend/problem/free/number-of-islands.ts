// Imports specific utility functions and type definitions from the relative paths
import { cloneDeep } from "lodash";
import { Problem, ProblemState, Variable } from "../core/types";
import { as2dArray, asValueGroup, deepClone2DArray } from "../core/utils";

// Defines the interface for the input expected by the numIslands function
interface NumIslandsInput {
  grid: string[][];
}

interface NumIslandsInput {
  grid: string[][];
}

export function numIslands(p: NumIslandsInput): ProblemState[] {
  const { grid } = p;
  const clonedGrid = deepClone2DArray(grid); // Use the deep clone for operations
  const steps: ProblemState[] = [];
  let numIslands = 0;
  const rowCount = clonedGrid.length;
  const colCount = clonedGrid[0].length;
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
    v.push(as2dArray("grid", (clonedGrid), [{ r: i, c: j }]));
    v.push(asValueGroup("counter", { numIslands }, { max: (rowCount * colCount) / 2, min: 0 }));
    steps.push(step);
  }
  log(1);

  function dfs(i: number, j: number) {
    log(2, i, j);
    if (i < 0 || i >= rowCount || j < 0 || j >= colCount || clonedGrid[i][j] !== '1') {
      return;
    }
    clonedGrid[i][j] = '2'; // Mark the cell as visited
    for (const [dx, dy] of directions) {
      dfs(i + dx, j + dy);
    }
  }

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      log(8,i,j);
      if (clonedGrid[i][j] === '1') {
        log(9,i,j);
        numIslands++;
        dfs(i, j);
      }
    }
  }

  console.log("steps", steps);
  return steps;
}


// Example implementation of the numIslands function for demonstration and testing
const code = `function numIslands(grid: string[][]): number {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const rowCount = grid.length;
  const colCount = grid[0].length;
  //#1

  function dfs(i: number, j: number) {
    //#2
    const isOutOfBounds = i < 0 || i >= rowCount || j < 0 || j >= colCount;
    if(isOutOfBounds) {
      //#3
      return;
    }
    const isWater = grid[i][j] !== '1';
    if (isWater) {
      //#4
      return;
    }

    //#5
    grid[i][j] = '2'; // Mark the cell as visited
    for (const d of directions) {
      let [x, y] = d;
      //#6
      x += i;
      y += j;

      //#7
      dfs(x, y);
    }
  }

  let numIslands = 0;

  // Iterate over the grid to find islands
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      //#8
      if (grid[i][j] === '1') {
        //#9
        numIslands++;
        dfs(i, j);
      }
    }
  }

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
  id: "number-of-islands",
  tags: ["graph"],
};
