// Imports specific utility functions and type definitions from the relative paths
import { cloneDeep } from "lodash";
import { ProblemState, Variable } from "algo-lens-core"; // Removed Problem
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import { as2dArray, asValueGroup, deepClone2DArray } from "../../core/utils";
import { NumIslandsInput } from "./types"; // Import NumIslandsInput

// Removed duplicate NumIslandsInput interface definition

export function generateSteps(grid: string[][]): ProblemState[] {
  // Renamed and Exported
  const l = new StepLoggerV2();
  let numIslands = 0;
  const rowCount = grid.length;
  const colCount = grid[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  l.breakpoint(1);
  l.grid("grid", grid);
  l.group(
    "counter",
    { numIslands },
    { max: (rowCount * colCount) / 2, min: 0 }
  );

  function dfs(i: number, j: number) {
    l.grid("grid", grid, ...[{ r: i, c: j }]);
    l.group(
      "counter",
      { numIslands },
      { max: (rowCount * colCount) / 2, min: 0 }
    );
    l.breakpoint(2);
    if (
      i < 0 ||
      i >= rowCount ||
      j < 0 ||
      j >= colCount ||
      grid[i][j] !== "1"
    ) {
      return;
    }
    grid[i][j] = "2"; // Mark the cell as visited
    for (const [dx, dy] of directions) {
      dfs(i + dx, j + dy);
    }
  }

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      l.grid("grid", grid, ...[{ r: i, c: j }]);
      l.group(
        "counter",
        { numIslands },
        { max: (rowCount * colCount) / 2, min: 0 }
      );
      l.breakpoint(8);
      if (grid[i][j] === "1") {
        l.grid("grid", grid, ...[{ r: i, c: j }]);
        l.group(
          "counter",
          { numIslands },
          { max: (rowCount * colCount) / 2, min: 0 }
        );
        l.breakpoint(9);
        numIslands++;
        dfs(i, j);
      }
    }
  }

  const result = numIslands;
  l.simple({ result });
  l.breakpoint(10);
  return l.getSteps();
}

// Removed code, title, getInput, Problem export
