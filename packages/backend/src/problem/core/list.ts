import { maxProfitProblem } from "../free/bestTimeToBuyAndSellStocks";
import { climbStairsProblem } from "../free/climbingStairs";
import { houseRobberProblem } from "../free/houseRobber";
import { wordBreakProblem } from "../free/wordBreak";
import { editDistanceProblem } from "../free/editDistance";
import { coinChangeProblem } from "../free/coinChange";
import { longestIncreasingSubsequenceProblem } from "../free/longestIncreasingSubsequence";
import { minPathSumProblem } from "../free/minimumPathSum";
import { uniquePathsProblem } from "../free/uniquePaths";
import { twoSumProblem } from "../free/two-sum";
import { maxAreaProblem } from "../free/container-with-most-water";
import { countBitsProblem } from "../free/counting-bits";
import { hammingWeightProblem } from "../free/number-of-1-bits";
import { maxSubArrayProblem } from "../free/maximum-subarray";
import { missingNumberProblem } from "../free/missing-number";
import { sumOfTwoIntegersProblem } from "../free/sum-of-two-integers";
import { numIslandsProblem } from "../free/number-of-islands";
import { productExceptSelfProblem } from "../free/product-of-array-except-self";
import { setMatrixZeroesProblem } from "../free/set-matrix-zeros";
import { searchProblem } from "../free/search-in-rotated-sorted-array";
import { eraseOverlapIntervalsProblem } from "../free/non-overlapping-intervals";
import { mergeIntervalsProblem } from "../free/merge-intervals";
import { sameTreeProblem } from "../free/sameTree";
import { reverseListProblem } from "../free/reverse-linked-list";
import { containsDuplicateProblem } from "../free/contains-duplicate";
import { Problem, ProblemGroup } from "./types"
import { threeSumProblem } from "../free/3sum";
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
    reverseListProblem,
    twoSumProblem,
    threeSumProblem,
  ];
  const groupedBlind = groupByTags(flatBlind);

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
function groupByTags(flatBlind: Problem<any, any>[]) {
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
  return groupedBlind;
}


export function getAllProblems(): Problem<any, any>[] {
  return allProblems.flatMap((group) => group.problems);
}