// Imports specific utility functions and type definitions from the relative paths
import { cloneDeep } from "lodash";
import { ProblemState, Variable } from "algo-lens-core"; // Removed Problem
import { as2dArray, asValueGroup, deepClone2DArray } from "../../core/utils";
import { NumIslandsInput } from "./types"; // Import NumIslandsInput

// Removed duplicate NumIslandsInput interface definition

export function generateSteps(p: NumIslandsInput): ProblemState[] { // Renamed and Exported
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

// Removed code, title, getInput, Problem export
