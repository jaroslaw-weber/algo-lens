import { maxProfitProblem } from "./list/dp1/bestTimeToBuyAndSellStocks";
import { climbStairsProblem } from "./list/dp1/climbingStairs";
import { houseRobberProblem } from "./list/dp1/houseRobber";
import { wordBreakProblem } from "./list/dp1/wordBreak";
import { editDistanceProblem } from "./list/dp2/editDistance";
import { coinChangeProblem } from "./list/dp1/coinChange";
import { longestIncreasingSubsequenceProblem } from "./list/dp1/longestIncreasingSubsequence";
import { minPathSumProblem } from "./list/dp2/minimumPathSum";
import { knapsackProblem } from "./list/dp2/knapsackProblem";
import { uniquePathsProblem } from "./list/dp2/uniquePaths";
import { twoSumProblem } from "./list/twoSum";
import { maxAreaProblem } from "./list/container-with-most-water";
import { countBitsProblem } from "./list/counting-bits";
import { hammingWeightProblem } from "./list/number-of-1-bits";

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
  hammingWeightProblem
].filter((x) => !x.hide);
