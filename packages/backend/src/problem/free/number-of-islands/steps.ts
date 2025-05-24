// Imports specific utility functions and type definitions from the relative paths
import { cloneDeep } from "lodash";
import { ProblemState, Variable } from "algo-lens-core"; // Removed Problem
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
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
  l.comment =
    "Initialize the island count to 0. This variable will keep track of the number of distinct islands found in the grid. The grid represents the map, where '1' is land and '0' is water.";
  l.breakpoint(1);

  function dfs(i: number, j: number) {
    l.grid(
      "grid",
      grid,
      ...[{ r: i, c: j, label: "current", color: "primary" }]
    );
    l.group(
      "counter",
      { numIslands },
      { max: (rowCount * colCount) / 2, min: 0 }
    );
    l.comment = `Start DFS from current land cell.`;
    l.breakpoint(2);
    // Check for out of bounds
    if (i < 0 || i >= rowCount || j < 0 || j >= colCount) {
      l.comment = `Check grid boundaries. Stop if out of bounds.`;
      l.breakpoint(3); // Breakpoint after out-of-bounds check
      return;
    }
    // Check if the cell is water or already visited ('0' or '2')
    if (grid[i][j] !== "1") {
      l.grid(
        "grid",
        grid,
        ...[{ r: i, c: j, label: "current", color: "error" }]
      );
      l.comment = `Check if cell is water or visited. Stop DFS.`;
      l.breakpoint(4); // Breakpoint after water/visited check
      return;
    }
    l.comment = `Mark current land cell as visited ('2').`;
    l.breakpoint(5); // Breakpoint before marking as visited
    grid[i][j] = "2"; // Mark the cell as visited ('2')

    for (const [dx, dy] of directions) {
      const x = i + dx; // Calculate new row index
      const y = j + dy; // Calculate new column index
      l.grid(
        "grid",
        grid,
        ...[
          { r: i, c: j, color: "primary", label: "current" },
          { r: x, c: y, color: "neutral", label: "next" },
        ]
      );
      l.comment = `Explore neighbor. Recursively call DFS.`;
      l.breakpoint(6); // Breakpoint before calculating new coordinates (corresponds to x += i; y += j; conceptually)

      dfs(x, y); // Recursive call for the adjacent cell
    }
  }

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      l.grid(
        "grid",
        grid,
        ...[{ r: i, c: j, label: "current", color: "primary" }]
      );
      l.group(
        "counter",
        { numIslands },
        { max: (rowCount * colCount) / 2, min: 0 }
      );
      l.comment = `Iterate grid. Check for unvisited land.`;
      l.breakpoint(7);
      if (grid[i][j] === "1") {
        numIslands++;
        l.grid(
          "grid",
          grid,
          ...[{ r: i, c: j, label: "current", color: "success" }]
        );
        l.group(
          "counter",
          { numIslands: numIslands + 1 }, // Show the value after increment
          { max: (rowCount * colCount) / 2, min: 0 }
        );
        l.comment = `Found new island. Increment count. Start DFS.`;
        l.breakpoint(8);
        dfs(i, j);
      }
    }
  }

  const result = numIslands;

  l.simple({ result });
  l.comment = `All cells visited. Total islands: ${result}.`;
  l.breakpoint(9);
  return l.getSteps();
}

// Removed code, title, getInput, Problem export
