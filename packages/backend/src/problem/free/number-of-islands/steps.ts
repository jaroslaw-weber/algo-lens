import { ProblemStep, StepLogger } from "algo-lens-core";
import { as2dArray, asSimpleValue, deepClone2DArray } from "algo-lens-core/utils"; // Assuming utils location
import { NumberOfIslandsParams } from "./types";
import { codeRaw } from "./code";

export const generateSteps = (
  params: NumberOfIslandsParams
): ProblemStep[] => {
  const { grid: initialGrid } = params;
  // Clone grid for internal modification (marking visited '2')
  const grid = deepClone2DArray(initialGrid);
  const logger = new StepLogger(codeRaw);

  const rowCount = grid.length;
  if (rowCount === 0) {
    logger.log({ breakpoint: 1, state: {} }); // Log initial state even for empty grid
    logger.log({ breakpoint: 10, state: { numIslands: asSimpleValue(0) } }); // Log final state
    return logger.getSteps();
  }
  const colCount = grid[0].length;
  let numIslands = 0;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  // Log initial state
  logger.log({
    breakpoint: 1,
    state: {
      grid: as2dArray(grid), // Show initial grid
      numIslands: asSimpleValue(numIslands),
    },
  });

  function dfs(r: number, c: number) {
    // Log DFS entry point
    logger.log({
      breakpoint: 2,
      state: {
        grid: as2dArray(grid, [{ r, c }]), // Highlight cell being visited by DFS
        numIslands: asSimpleValue(numIslands),
        r: asSimpleValue(r), // Show current r, c in DFS scope
        c: asSimpleValue(c),
      },
    });

    if (r < 0 || r >= rowCount || c < 0 || c >= colCount || grid[r][c] === '0' || grid[r][c] === '2') {
      return; // Base case handled in code.ts breakpoints, no specific log needed here unless desired
    }

    grid[r][c] = '2'; // Mark as visited
    // Log after marking visited
    logger.log({
      breakpoint: 3,
      state: {
        grid: as2dArray(grid, [{ r, c }]), // Show updated grid with '2'
        numIslands: asSimpleValue(numIslands),
        r: asSimpleValue(r),
        c: asSimpleValue(c),
      },
    });

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      // Log before exploring neighbor
      logger.log({
        breakpoint: 4,
        state: {
          grid: as2dArray(grid, [{ r, c }, {r: nr, c: nc}]), // Highlight current and neighbor
          numIslands: asSimpleValue(numIslands),
          r: asSimpleValue(r),
          c: asSimpleValue(c),
        },
      });
      dfs(nr, nc);
      // Log after returning from neighbor DFS call
      logger.log({
        breakpoint: 5,
        state: {
          grid: as2dArray(grid, [{ r, c }]), // Back to current cell
          numIslands: asSimpleValue(numIslands),
          r: asSimpleValue(r),
          c: asSimpleValue(c),
        },
      });
    }
     // Log after exploring all neighbors
     logger.log({
        breakpoint: 6,
        state: {
          grid: as2dArray(grid, [{ r, c }]), // Show current cell finished DFS
          numIslands: asSimpleValue(numIslands),
          r: asSimpleValue(r),
          c: asSimpleValue(c),
        },
      });
  }

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      // Log checking cell in main loop
      logger.log({
        breakpoint: 7,
        state: {
          grid: as2dArray(grid, [{ r, c }]), // Highlight cell being checked
          numIslands: asSimpleValue(numIslands),
          r: asSimpleValue(r),
          c: asSimpleValue(c),
        },
      });
      if (grid[r][c] === '1') {
        // Log finding a new island
        logger.log({
          breakpoint: 8,
          state: {
            grid: as2dArray(grid, [{ r, c }]), // Highlight start of new island
            numIslands: asSimpleValue(numIslands), // Count before increment
            r: asSimpleValue(r),
            c: asSimpleValue(c),
          },
        });
        numIslands++;
        dfs(r, c);
        // Log after completing DFS for an island
        logger.log({
          breakpoint: 9,
          state: {
            grid: as2dArray(grid), // Show grid after island is marked '2'
            numIslands: asSimpleValue(numIslands), // Updated count
            r: asSimpleValue(r),
            c: asSimpleValue(c),
          },
        });
      }
    }
  }

  // Log final state
  logger.log({
    breakpoint: 10,
    state: {
      grid: as2dArray(grid), // Show final grid state
      numIslands: asSimpleValue(numIslands), // Final count
    },
  });

  return logger.getSteps();
};
