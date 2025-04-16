import { Problem, ProblemState } from "algo-lens-core";
import { as2dArray, asArray, asSimpleValue } from "algo-lens-core/src/utils";

function minPathSum(p: MinPathSumInput): ProblemState[] {
  const { grid } = p;
  const steps: ProblemState[] = [];
  const m = grid.length;
  const n = grid[0].length;
  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
  dp[0][0] = grid[0][0];

  // Initial step
  steps.push({
    variables: [as2dArray("grid", grid, [{r:0,c:0}]), as2dArray("dp", dp, [{r:0,c:0}])],
    breakpoint: 1,
  });

  // Initialize the first row
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
    steps.push({
      variables: [
        as2dArray("grid", grid, [{ r: 0, c: j }]),
        as2dArray("dp", dp, [
          { r: 0, c: j },
          { r: 0, c: j - 1 },
        ]),
      ],
      breakpoint: 2,
    });
  }

  // Initialize the first column
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
    steps.push({
      variables: [
        as2dArray("grid", grid, [{ r: i, c: 0 }]),
        as2dArray("dp", dp, [
          { r: i, c: 0 },
          { r: i - 1, c: 0 },
        ]),
      ],
      breakpoint: 3,
    });
  }

  // Fill the rest of the dp array
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      steps.push({
        variables: [
          as2dArray("grid", grid, [{ r: i, c: j }]),
          as2dArray("dp", dp, [{ r: i, c: j },{ r: i-1, c: j },{ r: i, c: j-1 }]),
        ],
        breakpoint: 4,
      });
    }
  }

  const result = dp[m - 1][n - 1];
  steps.push({
    variables: [
      asArray("grid", grid),
      asArray("dp", dp),
      ...asSimpleValue({ result: result }),
    ],
    breakpoint: 5,
  });

  return steps;
}

interface MinPathSumState extends ProblemState {
  variables: any[];
  breakpoint: number;
}

interface MinPathSumInput {
  grid: number[][];
}

const code = `function minPathSum(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));
  dp[0][0] = grid[0][0];
  //#1
  
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
    
    //#2
  }
  
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
    //#3
  }
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      //#4
    }
  }
  
  const result = dp[m - 1][n - 1];
  //#5
  return result;
}`;

const title = "Minimum Path Sum";
const getInput = () => ({
  grid: [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ],
});

export const minPathSumProblem: Problem<MinPathSumInput, MinPathSumState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: minPathSum,
  id: "minimum-path-sum",
  tags: ["2d dynamic programming"],
};
