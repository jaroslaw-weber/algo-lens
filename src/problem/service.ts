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
  maxProfitProblem,
  
  climbStairsProblem,
  coinChangeProblem,

  houseRobberProblem,
  wordBreakProblem,
  /*
  editDistanceProblem,
  longestIncreasingSubsequenceProblem,
  minPathSumProblem,
  knapsackProblem,
  uniquePathsProblem,
  */
];

export const getRandomProblem = () => sample(problems);

export function asSingleValue(o: any): NumberVariable[] {
  return Object.keys(o).map(
    (k) => ({ label: k, value: o[k], type: "number" } as NumberVariable)
  );
}

export function asArray(
  label: string,
  arr: any[],
  column1?: number,
  column2?: number,
  column3?:number
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
      {
        value: column3,
        dimension: "column",
      }
    ],
  };
  return result;
}

export interface Pointer2D{
r:number;
c:number
}

export function as2dArray(
  label: string,
  arr: any[][],
  pointers: Pointer2D[],
): ArrayVariable {
  const result: ArrayVariable = {
    label,
    type: "array",
    value: cloneDeep(arr),
    pointers: [],
  };
  for(const p of pointers){
    result.pointers.push({
      value: p.r,
      dimension: "row",
    })
    result.pointers.push({
      value: p.c,
      dimension: "column",
    })
  }
  return result;
}
