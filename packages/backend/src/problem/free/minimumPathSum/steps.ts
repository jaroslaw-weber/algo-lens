import { ProblemStep, StepLogger } from "algo-lens-core";
import { as2dArray, asSimpleValue } from "algo-lens-core/utils"; // Assuming utils location
import { MinimumPathSumParams } from "./types";
import { codeRaw } from "./code";

export const generateSteps = (
  params: MinimumPathSumParams
): ProblemStep[] => {
  const { grid } = params;
  const logger = new StepLogger(codeRaw);

  const m = grid.length;
  const n = grid[0].length;
  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
  dp[0][0] = grid[0][0];

  logger.log({
    breakpoint: 1,
    state: {
      grid: as2dArray(grid, [{ r: 0, c: 0 }]),
      dp: as2dArray(dp, [{ r: 0, c: 0 }]),
    },
  });

  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
    logger.log({
      breakpoint: 2,
      state: {
        grid: as2dArray(grid, [{ r: 0, c: j }]),
        dp: as2dArray(dp, [
          { r: 0, c: j },
          { r: 0, c: j - 1 },
        ]),
        j: asSimpleValue(j),
      },
    });
  }

  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
    logger.log({
      breakpoint: 3,
      state: {
        grid: as2dArray(grid, [{ r: i, c: 0 }]),
        dp: as2dArray(dp, [
          { r: i, c: 0 },
          { r: i - 1, c: 0 },
        ]),
        i: asSimpleValue(i),
      },
    });
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      logger.log({
        breakpoint: 4,
        state: {
          grid: as2dArray(grid, [{ r: i, c: j }]),
          dp: as2dArray(dp, [
            { r: i, c: j },
            { r: i - 1, c: j },
            { r: i, c: j - 1 },
          ]),
          i: asSimpleValue(i),
          j: asSimpleValue(j),
        },
      });
    }
  }

  const result = dp[m - 1][n - 1];
  logger.log({
    breakpoint: 5,
    state: {
      grid: as2dArray(grid), // Show full final grid
      dp: as2dArray(dp),     // Show full final dp table
      result: asSimpleValue(result),
    },
  });

  return logger.getSteps();
};
