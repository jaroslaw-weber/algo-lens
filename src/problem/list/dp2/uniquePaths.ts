import { Problem } from "../../Problem";
import { cloneDeep} from 'lodash'
function uniquePaths(p: { m: number, n: number }): any[] {
  const { m, n } = p;
  const steps = [];
  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

  // Initialize the first row and first column with 1 because there is only one way to get to any cell in the first row or column.
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
    steps.push({ dp: cloneDeep(dp), line: 1 });
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
    steps.push({dp: cloneDeep(dp), line: 6 });
  }

  // Calculate the number of unique paths for each cell
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      steps.push({ i, j,dp: cloneDeep(dp), line: 13 });
    }
  }

  const result = dp[m - 1][n - 1];
  steps.push({ dp, result, line: 18 });
  return steps;
}

interface UniquePathsState {
  dp: number[][];
}

interface UniquePathsInput {
  m: number;
  n: number;
}

const code = `function uniquePaths(m: number, n: number): number {
  const dp = Array.from({ length: m }, () => Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}`;

const title = "Unique Paths";

const getInput = () => ({ m: 3, n: 7 });

export const uniquePathsProblem: Problem<
  UniquePathsInput,
  UniquePathsState
> = {
  title: title,
  code: code,
  getInput: getInput,
  func: uniquePaths,
};
