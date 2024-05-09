import { Problem, ProblemState } from "../../Problem";
import { asArray, asSingleValue } from "../../service";

function uniquePaths(p: UniquePathsInput): ProblemState[] {
  const { m, n } = p;
  const steps: ProblemState[] = [];
  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

  // Initialize the first row and first column with 1
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
    steps.push({
      variables: [
        asArray("dp", dp, i, 0)
      ],
      breakpoint: 1,
    });
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
    steps.push({
      variables: [
        asArray("dp", dp, 0, j)
      ],
      breakpoint: 2,
    });
  }

  // Calculate the number of unique paths for each cell
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      steps.push({
        variables: [
          asArray("dp", dp, i, j),
          ...asSingleValue({ "i": i, "j": j, "value": dp[i][j] })
        ],
        breakpoint: 3,
      });
    }
  }

  const result = dp[m - 1][n - 1];
  steps.push({
    variables: [
      asArray("dp", dp),
      ...asSingleValue({ "result": result })
    ],
    breakpoint: 4,
  });

  return steps;
}

interface UniquePathsState extends ProblemState {
  variables: any[];
  breakpoint: number;
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
