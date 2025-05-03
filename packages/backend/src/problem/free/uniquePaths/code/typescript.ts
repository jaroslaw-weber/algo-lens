import { Problem, ProblemState } from "algo-lens-core";
// Assuming visualization helpers are handled by StepLoggerV2
// import { as2dArray, asArray, asSimpleValue, asValueGroup } from "../core/utils";

// Input type (will be defined in types.ts)
interface UniquePathsInput {
  m: number;
  n: number;
}

// Core algorithm - DP approach. Breakpoints will be added.
export function uniquePathsAlgorithm(m: number, n: number): number {
  // #1 Initialize DP table with zeros.
  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

  // #2 Initialize the first column with 1s.
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
     // #3 Inside first column initialization loop.
  }
  // #4 Initialize the first row with 1s.
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
     // #5 Inside first row initialization loop.
  }

  // #6 Calculate the number of unique paths for each cell using DP.
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // #7 Inside nested loops. Calculate dp[i][j].
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
       // #8 Value for dp[i][j] calculated.
    }
  }

  // #9 DP calculation finished. Return the value in the bottom-right cell.
  return dp[m - 1][n - 1];
}


// Old step generation function (for reference)
export function uniquePaths_OldSteps(p: UniquePathsInput): ProblemState[] {
  const { m, n } = p;
  const steps: ProblemState[] = [];
  const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

  // Initialize the first row and first column with 1
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
    // Old logging: steps.push({ variables: [asArray("dp", dp, i, 0)], breakpoint: 1 }); // BP 1 (repeated)
  }
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
     // Old logging: steps.push({ variables: [as2dArray("dp", dp, [{ r: 0, c: j }])], breakpoint: 2 }); // BP 2 (repeated)
  }

  // Calculate the number of unique paths for each cell
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
       // Old logging: steps.push({ variables: [ as2dArray("dp", dp, [{ r: i, c: j }, { r: i - 1, c: j }, { r: i, c: j - 1 }]), asValueGroup("loops", { i, j }, { min: 0, max: Math.max(m,n) }) ], breakpoint: 3 }); // BP 3 (repeated)
    }
  }

  const result = dp[m - 1][n - 1];
   // Old logging: steps.push({ variables: [asArray("dp", dp), ...asSimpleValue({ result: result })], breakpoint: 4 }); // BP 4

  return steps;
}

// Code string for display - updated with breakpoints
const code = `function uniquePaths(m: number, n: number): number {
  //#1 Initialize DP table with zeros.
  const dp = Array.from({ length: m }, () => Array(n).fill(0));

  //#2 Initialize the first column with 1s.
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1;
    //#3 Inside first column initialization loop.
  }

  //#4 Initialize the first row with 1s.
  for (let j = 0; j < n; j++) {
    dp[0][j] = 1;
    //#5 Inside first row initialization loop.
  }

  //#6 Calculate the number of unique paths for each cell using DP.
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      //#7 Inside nested loops. Calculate dp[i][j].
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      //#8 Value for dp[i][j] calculated.
    }
  }

  //#9 DP calculation finished. Return the value in the bottom-right cell.
  return dp[m - 1][n - 1];
}`;

// Problem definition will be moved to problem.ts
export const problem: Problem<UniquePathsInput /*, ProblemState removed */> = {
  title: "Unique Paths",
  emoji: '🤖',
  code, // Reference the code string defined above
  // func: uniquePaths_OldSteps, // func is usually removed, rely on generateSteps
  id: "unique-paths",
  tags: ["Math", "Dynamic Programming", "Combinatorics", "Array"], // Added relevant tags
};
