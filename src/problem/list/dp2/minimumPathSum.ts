import { Problem } from "../../Problem";

function minPathSum(p: { grid: number[][] }): any[] {
  const { grid } = p;
  const steps = [];
  const m = grid.length;
  const n = grid[0].length;
  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
  dp[0][0] = grid[0][0];
  steps.push({ grid, dp: dp.map(row => row.slice()), line: 1 });

  // Initialize the first row
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
    steps.push({ grid, dp: dp.map(row => row.slice()), line: 6 });
  }

  // Initialize the first column
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
    steps.push({ grid, dp: dp.map(row => row.slice()), line: 11 });
  }

  // Fill the rest of the dp array
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      steps.push({ i, j, grid, dp: dp.map(row => row.slice()), line: 17 });
    }
  }

  const result = dp[m - 1][n - 1];
  steps.push({ grid, dp, result, line: 23 });
  return steps;
}

interface MinPathSumState {
  grid: number[][];
  dp: number[][];
}

interface MinPathSumInput {
  grid: number[][];
}

const code = `function minPathSum(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
  dp[0][0] = grid[0][0];
  
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }
  
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }
  
  return dp[m - 1][n - 1];
}`;

const title = "Minimum Path Sum";

const getInput = () => ({ grid: [[1,3,1], [1,5,1], [4,2,1]] });

export const minPathSumProblem: Problem<
  MinPathSumInput,
  MinPathSumState
> = {
  title: title,
  code: code,
  getInput: getInput,
  func: minPathSum,
};
