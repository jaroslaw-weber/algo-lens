import { Problem, ProblemState } from "../../types";
import { as2dArray, asArray, asSimpleValue } from "../../utils";

function knapsack(p: KnapsackInput): ProblemState[] {
  const { values, weights, capacity } = p;
  const steps: ProblemState[] = [];
  const n = values.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0)
  );

  // Build table dp[][] in a bottom-up manner
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
      steps.push({
        variables: [
          as2dArray("dp", dp, [{ r: i, c: w }]),
          ...asSimpleValue({ i: i, w: w, currentMax: dp[i][w] }),
        ],
        breakpoint: i,
      });
    }
  }

  const result = dp[n][capacity];
  steps.push({
    variables: [
      as2dArray("dp", dp, [{ r: n, c: capacity }]),
      ...asSimpleValue({ result: result }),
    ],
    breakpoint: n + 1,
  });

  return steps;
}

interface KnapsackInput {
  values: number[];
  weights: number[];
  capacity: number;
}

const code = `function knapsack(values: number[], weights: number[], capacity: number): number {
  const n = values.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
      //#1
    }
  }
  const result = dp[n][capacity];
  //#2
  return result
}`;

const title = "Knapsack Problem";
const getInput = () => ({
  values: [5, 2, 3, 8],
  weights: [5, 1, 3, 7],
  capacity: 10,
});

export const knapsackProblem: Problem<KnapsackInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: knapsack,
  id: "target-sum",
  hide:true//not correct
};
