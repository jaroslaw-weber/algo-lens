import { ProblemStep, StepLogger } from "algo-lens-core";
import { as2dArray, asSimpleValue, asCoordinateList } from "algo-lens-core/utils"; // Assuming utils location
import { PacificAtlanticWaterFlowParams } from "./types";
import { codeRaw } from "./code";

export const generateSteps = (
  params: PacificAtlanticWaterFlowParams
): ProblemStep[] => {
  const { heights } = params;
  const logger = new StepLogger(codeRaw);

  const rows = heights.length;
  if (rows === 0) {
    logger.log({ breakpoint: 1, state: {} }); // Initial empty state
    logger.log({ breakpoint: 10, state: { result: asCoordinateList([]) } }); // Final empty state
    return logger.getSteps();
  }
  const cols = heights[0].length;
  if (cols === 0) {
    logger.log({ breakpoint: 1, state: {} }); // Initial empty state
    logger.log({ breakpoint: 10, state: { result: asCoordinateList([]) } }); // Final empty state
    return logger.getSteps();
  }

  const pacificReachable = Array.from({ length: rows }, () => Array(cols).fill(false));
  const atlanticReachable = Array.from({ length: rows }, () => Array(cols).fill(false));
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  const result: number[][] = [];

  // Log initial state
  logger.log({
    breakpoint: 1,
    state: {
      heights: as2dArray(heights),
      pacificReachable: as2dArray(pacificReachable),
      atlanticReachable: as2dArray(atlanticReachable),
      result: asCoordinateList(result),
    },
  });

  // DFS function adapted for step logging
  function dfs(r: number, c: number, reachable: boolean[][], ocean: 'pacific' | 'atlantic') {
    const currentReachable = ocean === 'pacific' ? pacificReachable : atlanticReachable;

    // Log DFS start
    logger.log({
      breakpoint: 'dfs_start',
      state: {
        heights: as2dArray(heights),
        pacificReachable: as2dArray(pacificReachable),
        atlanticReachable: as2dArray(atlanticReachable),
        r: asSimpleValue(r),
        c: asSimpleValue(c),
        // Could add 'ocean' variable if needed
      },
      highlight: [{ r, c }] // Highlight current cell
    });

    reachable[r][c] = true;

    // Log after marking reachable
    logger.log({
      breakpoint: 'dfs_marked',
      state: {
        heights: as2dArray(heights),
        pacificReachable: as2dArray(pacificReachable), // Show updated reachable matrix
        atlanticReachable: as2dArray(atlanticReachable),
        r: asSimpleValue(r),
        c: asSimpleValue(c),
      },
      highlight: [{ r, c }]
    });


    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      // Log checking neighbor
       logger.log({
        breakpoint: 'dfs_check_neighbor',
        state: {
          heights: as2dArray(heights),
          pacificReachable: as2dArray(pacificReachable),
          atlanticReachable: as2dArray(atlanticReachable),
          r: asSimpleValue(r),
          c: asSimpleValue(c),
        },
         highlight: [{ r, c }, { r: nr, c: nc }] // Highlight current and neighbor
      });


      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || reachable[nr][nc] || heights[nr][nc] < heights[r][c]) {
         logger.log({ breakpoint: 'dfs_skip_neighbor', state: { /* state */ }, highlight: [{ r, c }, { r: nr, c: nc }] });
        continue;
      }

       logger.log({ breakpoint: 'dfs_call_neighbor', state: { /* state */ }, highlight: [{ r, c }, { r: nr, c: nc }] });
      dfs(nr, nc, reachable, ocean);
       logger.log({ breakpoint: 'dfs_return_neighbor', state: { /* state */ }, highlight: [{ r, c }] }); // Back to current cell
    }

     logger.log({ breakpoint: 'dfs_end', state: { /* state */ }, highlight: [{ r, c }] }); // Finished with cell
  }

  // --- Pacific DFS ---
  for (let r = 0; r < rows; r++) {
    logger.log({ breakpoint: 2, state: { /* state */ }, highlight: [{ r, c: 0 }] });
    dfs(r, 0, pacificReachable, 'pacific');
  }
  for (let c = 1; c < cols; c++) {
     logger.log({ breakpoint: 3, state: { /* state */ }, highlight: [{ r: 0, c }] });
    dfs(0, c, pacificReachable, 'pacific');
  }
  logger.log({
    breakpoint: 4, // Pacific DFS complete
    state: {
      heights: as2dArray(heights),
      pacificReachable: as2dArray(pacificReachable), // Show final Pacific reachability
      atlanticReachable: as2dArray(atlanticReachable),
      result: asCoordinateList(result),
    },
  });


  // --- Atlantic DFS ---
  for (let r = 0; r < rows; r++) {
    logger.log({ breakpoint: 5, state: { /* state */ }, highlight: [{ r, c: cols - 1 }] });
    dfs(r, cols - 1, atlanticReachable, 'atlantic');
  }
  for (let c = 0; c < cols - 1; c++) {
     logger.log({ breakpoint: 6, state: { /* state */ }, highlight: [{ r: rows - 1, c }] });
    dfs(rows - 1, c, atlanticReachable, 'atlantic');
  }
   logger.log({
    breakpoint: 7, // Atlantic DFS complete
    state: {
      heights: as2dArray(heights),
      pacificReachable: as2dArray(pacificReachable),
      atlanticReachable: as2dArray(atlanticReachable), // Show final Atlantic reachability
      result: asCoordinateList(result),
    },
  });


  // --- Collect Results ---
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      logger.log({
        breakpoint: 8,
        state: {
          heights: as2dArray(heights),
          pacificReachable: as2dArray(pacificReachable),
          atlanticReachable: as2dArray(atlanticReachable),
          result: asCoordinateList(result),
          r: asSimpleValue(r),
          c: asSimpleValue(c),
        },
        highlight: [{ r, c }] // Highlight cell being checked
      });
      if (pacificReachable[r][c] && atlanticReachable[r][c]) {
         result.push([r, c]);
         logger.log({
            breakpoint: 9,
            state: {
              heights: as2dArray(heights),
              pacificReachable: as2dArray(pacificReachable),
              atlanticReachable: as2dArray(atlanticReachable),
              result: asCoordinateList(result), // Show updated result list
              r: asSimpleValue(r),
              c: asSimpleValue(c),
            },
            highlight: [{ r, c }] // Highlight cell added
          });
      }
    }
  }

  // Log final state
  logger.log({
    breakpoint: 10,
    state: {
      heights: as2dArray(heights),
      pacificReachable: as2dArray(pacificReachable),
      atlanticReachable: as2dArray(atlanticReachable),
      result: asCoordinateList(result), // Final result list
    },
  });

  return logger.getSteps();
};
