// Imports specific utility functions and type definitions from the relative paths
import { cloneDeep } from "lodash";
import { ProblemState, Variable } from "algo-lens-core"; // Removed Problem
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import { as2dArray, asValueGroup, deepClone2DArray } from "../../core/utils";
import { NumIslandsInput } from "./types"; // Import NumIslandsInput

// Removed duplicate NumIslandsInput interface definition

export function generateSteps(grid: number[][]): ProblemState[] {
  // Renamed and Exported
  const l = new StepLoggerV2();
  const clonedGrid = deepClone2DArray(grid); // Use the deep clone for operations
  let numIslands = 0;
  const rowCount = clonedGrid.length;
  const colCount = clonedGrid[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  l.breakpoint(1);
  l.grid("grid", clonedGrid);
  l.variables(
    "counter",
    { numIslands },
    { max: (rowCount * colCount) / 2, min: 0 }
  );

  function dfs(i: number, j: number) {
    l.breakpoint(2);
    l.grid("grid", clonedGrid, [{ r: i, c: j }]);
    l.variables(
      "counter",
      { numIslands },
      { max: (rowCount * colCount) / 2, min: 0 }
    );
    if (
      i < 0 ||
      i >= rowCount ||
      j < 0 ||
      j >= colCount ||
      clonedGrid[i][j] !== "1"
    ) {
      return;
    }
    clonedGrid[i][j] = "2"; // Mark the cell as visited
    for (const [dx, dy] of directions) {
      dfs(i + dx, j + dy);
    }
  }

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      l.breakpoint(8);
      l.grid("grid", clonedGrid, [{ r: i, c: j }]);
      l.variables(
        "counter",
        { numIslands },
        { max: (rowCount * colCount) / 2, min: 0 }
      );
      if (clonedGrid[i][j] === "1") {
        l.breakpoint(9);
        l.grid("grid", clonedGrid, [{ r: i, c: j }]);
        l.variables(
          "counter",
          { numIslands },
          { max: (rowCount * colCount) / 2, min: 0 }
        );
        numIslands++;
        dfs(i, j);
      }
    }
  }

  return l.getSteps();
}

// Removed code, title, getInput, Problem export
