import { Problem } from "../../Problem";

function knapsack(p: { values: number[], weights: number[], capacity: number }): any[] {
  const { values, weights, capacity } = p;
  const steps = [];
  const n = values.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  // Build table dp[][] in bottom up manner
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
      steps.push({ i, w, currentMax: dp[i][w], dp: dp.map(row => row.slice()), line: 9 });
    }
  }

  const result = dp[n][capacity];
  steps.push({ dp, result, line: 16 });
  return steps;
}

interface KnapsackState {
  dp: number[][];
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
    }
  }
  return dp[n][capacity];
}`;

const title = "Knapsack Problem";
const getInput = () => ({
	values: [5,2,3,8], // Reduced number of items
	weights: [5,1,3,7], // Corresponding weights for the reduced items
	capacity: 10 // Lower capacity to fit the reduced items
  });

export const knapsackProblem: Problem<
  KnapsackInput,
  KnapsackState
> = {
  title: title,
  code: code,
  getInput: getInput,
  func: knapsack,
};
