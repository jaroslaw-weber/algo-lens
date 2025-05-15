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
  l.comment = "Initialize the island count to 0. This variable will keep track of the number of distinct islands found in the grid. The grid represents the map, where '1' is land and '0' is water.";
  l.breakpoint(1);

  function dfs(i: number, j: number) {
    l.grid("grid", grid, ...[{ r: i, c: j }]);
    l.group(
      "counter",
      { numIslands },
      { max: (rowCount * colCount) / 2, min: 0 }
    );
    l.comment = `Start a Depth First Search (DFS) from the current land cell. DFS is used to explore and mark all connected land cells belonging to the same island.`;
    l.breakpoint(2);
    // Check for out of bounds
    if (i < 0 || i >= rowCount || j < 0 || j >= colCount) {
      l.comment = `Check if the current cell is outside the grid boundaries. If it is out of bounds, stop the DFS traversal for this path.`;
      l.breakpoint(3); // Breakpoint after out-of-bounds check
      return;
    }
    // Check if the cell is water or already visited ('0' or '2')
    if (grid[i][j] !== "1") {
      l.comment = `Check if the current cell is water ('0') or has already been visited ('2'). If it's not land ('1'), stop the DFS traversal for this path to avoid processing water or revisiting land.`;
      l.breakpoint(4); // Breakpoint after water/visited check
      return;
    }
    l.comment = `The current cell is land ('1') and has not been visited. Mark this cell as visited by changing its value to '2'. This prevents recounting the same land cell as part of a different island.`;
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
      l.comment = `Explore a neighbor cell of the current cell. Recursively call DFS on this neighbor to continue exploring the connected land cells of the current island.`;
      l.breakpoint(6); // Breakpoint before calculating new coordinates (corresponds to x += i; y += j; conceptually)

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
      l.comment = `Iterate through each cell in the grid. Check if the current cell is land ('1') and has not been visited.`;
      l.breakpoint(7);
      if (grid[i][j] === "1") {
        l.grid("grid", grid, ...[{ r: i, c: j }]);
        l.group(
          "counter",
          { numIslands: numIslands + 1 }, // Show the value after increment
          { max: (rowCount * colCount) / 2, min: 0 }
        );
        l.comment = `Found a land cell that has not been visited. This indicates the discovery of a new island. Increment the island count to ${numIslands + 1} and start a DFS from this cell to mark all connected land cells of this newly found island.`;
        l.breakpoint(8);
        numIslands++;
        dfs(i, j);
      }
    }
  }

  const result = numIslands;
  l.simple({ result });
  l.comment = `All cells in the grid have been visited. The total number of distinct islands found is ${result}.`;
  l.breakpoint(9);
  return l.getSteps();
}

// Removed code, title, getInput, Problem export
