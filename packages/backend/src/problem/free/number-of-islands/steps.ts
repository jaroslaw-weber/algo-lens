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

  l.grid("grid", grid);
  l.group(
    "counter",
    { numIslands },
    { max: (rowCount * colCount) / 2, min: 0 }
  );
  l.comment = "Initial state: grid and numIslands = 0.";
  l.breakpoint(1);

  function dfs(i: number, j: number) {
    l.grid("grid", grid, ...[{ r: i, c: j }]);
    l.group(
      "counter",
      { numIslands },
      { max: (rowCount * colCount) / 2, min: 0 }
    );
    l.comment = `DFS: Start processing cell (${i}, ${j}).`;
    l.breakpoint(2);
    // Check for out of bounds
    if (i < 0 || i >= rowCount || j < 0 || j >= colCount) {
      l.comment = `DFS: Out of bounds for cell (${i}, ${j}). Returning.`;
      l.breakpoint(3); // Breakpoint after out-of-bounds check
      return;
    }
    // Check if the cell is water or already visited ('0' or '2')
    if (grid[i][j] !== "1") {
      l.comment = `DFS: Cell (${i}, ${j}) is water or already visited ('${grid[i][j]}'). Returning.`;
      l.breakpoint(4); // Breakpoint after water/visited check
      return;
    }
    l.comment = `DFS: Marking cell (${i}, ${j}) as visited ('2').`;
    l.breakpoint(5); // Breakpoint before marking as visited
    grid[i][j] = "2"; // Mark the cell as visited ('2')

    for (const [dx, dy] of directions) {
      const x = i + dx; // Calculate new row index
      const y = j + dy; // Calculate new column index
      l.grid(
        "grid",
        grid,
        ...[
          { r: i, c: j, color: 1 as const },
          { r: x, c: y, color: 2 as const },
        ]
      );
      l.comment = `DFS: Exploring neighbor (${x}, ${y}) of cell (${i}, ${j}).`;
      l.breakpoint(6); // Breakpoint before calculating new coordinates (corresponds to x += i; y += j; conceptually)
      l.comment = `DFS: Recursive call for neighbor (${x}, ${y}).`;
      l.breakpoint(7); // Breakpoint right before the recursive call

      dfs(x, y); // Recursive call for the adjacent cell
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
      l.comment = `Main loop: Checking cell (${i}, ${j}).`;
      l.breakpoint(8);
      if (grid[i][j] === "1") {
        l.grid("grid", grid, ...[{ r: i, c: j }]);
        l.group(
          "counter",
          { numIslands: numIslands + 1 }, // Show the value after increment
          { max: (rowCount * colCount) / 2, min: 0 }
        );
        l.comment = `Main loop: Found land (grid[${i}][${j}] === '1'). Incrementing numIslands and starting DFS. New numIslands will be ${
          numIslands + 1
        }.`;
        l.breakpoint(9);
        numIslands++;
        dfs(i, j);
      }
    }
  }

  const result = numIslands;
  l.simple({ result });
  l.comment = `Final result: numIslands = ${result}.`;
  l.breakpoint(10);
  return l.getSteps();
}

// Removed code, title, getInput, Problem export
