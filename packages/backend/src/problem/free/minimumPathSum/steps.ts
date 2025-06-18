import { ProblemState } from "algo-lens-core/src/types";

import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2"; // Import StepLoggerV2
// Removed ProblemState, as2dArray, asArray, asSimpleValue
import { MinPathSumInput } from "./types"; // Import MinPathSumInput

export function generateSteps(p: MinPathSumInput): ProblemState[] {
  // Renamed and Exported, Return type inferred
  const { grid } = p; // Assuming grid is number[][]
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2

  if (!grid || grid.length === 0 || grid[0].length === 0) {
    l.grid("grid", []);
    l.simple({ result: 0 });

    l.breakpoint(5); // Directly to final state
    return l.getSteps();
  }

  // Make a deep copy to avoid modifying the original input grid if it's passed by reference elsewhere
  const dpGrid = grid.map((row) => [...row]); // Use dpGrid for in-place DP calculations

  const rows = dpGrid.length; // Use variable name from variables.ts
  const cols = dpGrid[0].length; // Use variable name from variables.ts
  l.simple({ rows });
  l.simple({ cols });

  // Initial state: Log the grid (DP table). grid[0][0] is the base case, no calculation needed.

  l.grid("grid", dpGrid);

  l.comment =
    "Create a DP table, which is a copy of the input grid. This table will store the minimum path sum to reach each cell.";
  l.breakpoint(1);

  // Initialize the first row (using 'col' index as per variables.ts)
  for (let col = 1; col < cols; col++) {
    l.simple({ col }); // Log current col index
    const prevValue = dpGrid[0][col - 1];
    const currentValue = grid[0][col]; // Original value from grid
    dpGrid[0][col] = prevValue + currentValue; // Update in place

    l.grid(
      "grid",
      dpGrid,
      { r: 0, c: col, label: "init row" },
      { r: 0, c: col - 1, label: "init row" }
    ); // Use grid, pass pointers directly
    l.comment = `Initialize first row of DP table.`;
    l.breakpoint(2);
  }
  l.simple({ col: undefined }); // Reset col index

  // Initialize the first column (using 'row' index as per variables.ts)
  for (let row = 1; row < rows; row++) {
    l.simple({ row }); // Log current row index
    const prevValue = dpGrid[row - 1][0];
    const currentValue = grid[row][0]; // Original value from grid
    dpGrid[row][0] = prevValue + currentValue; // Update in place

    l.grid(
      "grid",
      dpGrid,
      { r: row, c: 0, label: "init col" },
      { r: row - 1, c: 0, label: "init col" }
    ); // Use grid, pass pointers directly
    l.comment = `Initialize first column of DP table.`;
    l.breakpoint(3);
  }
  l.simple({ row: undefined }); // Reset row index

  // Fill the rest of the dp table (using 'row' and 'col')
  for (let row = 1; row < rows; row++) {
    l.simple({ row });
    for (let col = 1; col < cols; col++) {
      l.simple({ col });
      const valueAbove = dpGrid[row - 1][col];
      const valueLeft = dpGrid[row][col - 1];
      const originalValue = grid[row][col]; // Use original grid value for the addition part
      dpGrid[row][col] = Math.min(valueAbove, valueLeft) + originalValue; // Update in place

      l.grid(
        "grid",
        dpGrid,
        { r: row, c: col, label: "current", dir: "right" },
        { r: row - 1, c: col, label: "valueAbove", dir: "right" },
        { r: row, c: col - 1, label: "valueLeft", dir: "bottom" }
      ); // Use grid, pass pointers directly
      l.comment = `Fill DP table. Min path sum to current cell.`;
      l.breakpoint(4);
    }
    l.simple({ col: undefined }); // Reset col index for inner loop
  }
  l.simple({ row: undefined }); // Reset row index for outer loop

  // Final result
  const result = dpGrid[rows - 1][cols - 1]; // Use variable name from variables.ts

  // Corrected l.simple call to match signature: simple(value: Record<string, any>)
  l.simple({ result: result });
  l.grid("grid", dpGrid, { r: rows - 1, c: cols - 1, label: "result" }); // Use grid, pass pointer directly
  l.comment = `Loop finished. Min path sum: ${result}.`;
  l.breakpoint(5);

  return l.getSteps(); // Return the collected steps
}

// Removed MinPathSumState interface, MinPathSumInput interface, code, title, getInput, Problem export comment might be outdated.
