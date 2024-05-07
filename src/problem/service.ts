import { maxProfitProblem } from "./list/dp1/bestTimeToBuyAndSellStocks";
import { climbStairsProblem } from "./list/dp1/climbingStairs";
import { houseRobberProblem } from "./list/dp1/houseRobber";
import { sample, cloneDeep } from "lodash";
import { wordBreakProblem } from "./list/dp1/wordBreak";
import { editDistanceProblem } from "./list/dp2/editDistance";
import { coinChangeProblem } from "./list/dp1/coinChange";
import { longestIncreasingSubsequenceProblem } from "./list/dp1/longestIncreasingSubsequence";
import { minPathSumProblem } from "./list/dp2/minimumPathSum";
import { knapsackProblem } from "./list/dp2/knapsackProblem";
import { uniquePathsProblem } from "./list/dp2/uniquePaths";
import { ArrayVariable, NumberVariable } from "./Problem";

export const problems = [
  maxProfitProblem
  /*
  houseRobberProblem,
  climbStairsProblem,
  maxProfitProblem,
  wordBreakProblem,
  editDistanceProblem,
  coinChangeProblem,
  longestIncreasingSubsequenceProblem,
  minPathSumProblem,
  knapsackProblem,
  uniquePathsProblem,
  */
];

export const getRandomProblem = () => sample(problems);

export function asNum(o: any): NumberVariable[] {
  return Object.keys(o).map(
    (k) => ({ label: k, value: o[k], type: "number" } as NumberVariable)
  );
}

export function asArr(
  label: string,
  arr: any[],
  column1?: number,
  column2?: number
): ArrayVariable {
  const result: ArrayVariable = {
    label,
    type: "array",
    value: cloneDeep(arr),
    pointers: [
      {
        value: column1,
        dimension: "column",
      },
      {
        value: column2,
        dimension: "column",
      },
    ],
  };
  return result;
}

export function asArr2(
  label: string,
  arr: any[][],
  row: number,
  column?: number
): ArrayVariable {
  const result: ArrayVariable = {
    label,
    type: "array",
    value: cloneDeep(arr),
    pointers: [
      {
        value: row,
        dimension: "row",
      },
      {
        value: column,
        dimension: "column",
      },
    ],
  };
  return result;
}
