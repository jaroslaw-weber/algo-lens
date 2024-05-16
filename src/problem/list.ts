import { maxProfitProblem } from "./list/bestTimeToBuyAndSellStocks";
import { climbStairsProblem } from "./list/climbingStairs";
import { houseRobberProblem } from "./list/houseRobber";
import { wordBreakProblem } from "./list/wordBreak";
import { editDistanceProblem } from "./list/editDistance";
import { coinChangeProblem } from "./list/coinChange";
import { longestIncreasingSubsequenceProblem } from "./list/longestIncreasingSubsequence";
import { minPathSumProblem } from "./list/minimumPathSum";
import { knapsackProblem } from "./list/knapsackProblem";
import { uniquePathsProblem } from "./list/uniquePaths";
import { twoSumProblem } from "./list/two-sum";
import { maxAreaProblem } from "./list/container-with-most-water";
import { countBitsProblem } from "./list/counting-bits";
import { hammingWeightProblem } from "./list/number-of-1-bits";
import { maxSubArrayProblem } from "./list/maximum-subarray";
import { missingNumberProblem } from "./list/missing-number";
import { sumOfTwoIntegersProblem } from "./list/sum-of-two-integers";
import { numIslandsProblem } from "./list/number-of-islands";

export const problems = [
  maxProfitProblem,
  climbStairsProblem,
  coinChangeProblem,
  houseRobberProblem,
  wordBreakProblem,
  editDistanceProblem,
  longestIncreasingSubsequenceProblem,
  minPathSumProblem,
  knapsackProblem,
  uniquePathsProblem,
  twoSumProblem,
  maxAreaProblem,
  countBitsProblem,
  hammingWeightProblem,
  maxSubArrayProblem,
  missingNumberProblem,

  sumOfTwoIntegersProblem,
  numIslandsProblem,
].filter((x) => !x.hide);
