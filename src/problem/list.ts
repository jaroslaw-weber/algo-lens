import { maxProfitProblem } from "./list/bestTimeToBuyAndSellStocks";
import { climbStairsProblem } from "./list/climbingStairs";
import { houseRobberProblem } from "./list/houseRobber";
import { wordBreakProblem } from "./list/wordBreak";
import { editDistanceProblem } from "./list/editDistance";
import { coinChangeProblem } from "./list/coinChange";
import { longestIncreasingSubsequenceProblem } from "./list/longestIncreasingSubsequence";
import { minPathSumProblem } from "./list/minimumPathSum";
import { uniquePathsProblem } from "./list/uniquePaths";
import { twoSumProblem } from "./list/two-sum";
import { maxAreaProblem } from "./list/container-with-most-water";
import { countBitsProblem } from "./list/counting-bits";
import { hammingWeightProblem } from "./list/number-of-1-bits";
import { maxSubArrayProblem } from "./list/maximum-subarray";
import { missingNumberProblem } from "./list/missing-number";
import { sumOfTwoIntegersProblem } from "./list/sum-of-two-integers";
import { numIslandsProblem } from "./list/number-of-islands";
import { productExceptSelfProblem } from "./list/product-of-array-except-self";
import { setMatrixZeroesProblem } from "./list/set-matrix-zeros";
import { searchProblem } from "./list/search-in-rotated-sorted-array";
import { eraseOverlapIntervalsProblem } from "./list/non-overlapping-intervals";
import { mergeIntervalsProblem } from "./list/merge-intervals";
import { sameTreeProblem } from "./list/sameTree";
import { containsDuplicateProblem } from "./list/contains-duplicate";
import { ProblemGroup } from "./types";
import { groupBy } from "lodash";
export function getBlind75Problems(): ProblemGroup[] {
  const flatBlind = [
    maxProfitProblem,
    climbStairsProblem,
    coinChangeProblem,
    houseRobberProblem,
    wordBreakProblem,
    editDistanceProblem,
    longestIncreasingSubsequenceProblem,
    minPathSumProblem,
    uniquePathsProblem,
    // twoSumProblem, // Uncomment or remove if this is intended to be used or not.
    maxAreaProblem,
    countBitsProblem,
    hammingWeightProblem,
    maxSubArrayProblem,
    missingNumberProblem,
    sumOfTwoIntegersProblem,
    numIslandsProblem,
    productExceptSelfProblem,
    setMatrixZeroesProblem,
    searchProblem,
    eraseOverlapIntervalsProblem,
    mergeIntervalsProblem,
    sameTreeProblem,
    containsDuplicateProblem,
  ];
  const groupedBlind = new Map();
  for (const problem of flatBlind) {
    if (problem.tags) {
      for (const tag of problem.tags) {
        if (!groupedBlind.has(tag)) {
          groupedBlind.set(tag, []);
        }
        groupedBlind.get(tag).push(problem);
      }
    }
  }

  const blind75: ProblemGroup[] = [];
  for (const tag of Array.from(groupedBlind.keys())) {
    blind75.push({
      label: tag,
      problems: groupedBlind.get(tag),
    });
  }
  return blind75;
}


export const other: ProblemGroup[] = [];

export const allProblems: ProblemGroup[] = [...getBlind75Problems(), ...other];
