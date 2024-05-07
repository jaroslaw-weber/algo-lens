import { Problem } from "../../Problem";

function rob(houses: HouseRobberInput): any[] {
  const steps = [];
  const { nums } = houses;
  const n = nums.length;
  const dp: number[] = new Array(n + 1).fill(0);
  steps.push({ nums, dp: dp.slice(), line: 1 });
  dp[0] = 0; // Ensure dp[0] is set for clarity, even though it's technically not needed.
  steps.push({ nums, dp: dp.slice(), line: 2 });
  dp[1] = nums[0];
  steps.push({ nums, dp: dp.slice(), line: 3 });
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
    steps.push({ i, nums, dp: dp.slice(), line: 7 });
  }
  const result = dp[n];
  steps.push({ nums, dp, result, line: 12 });
  return steps;
}

interface HouseRobberState {
  label?: string;
  nums: number[];
  dp: number[];
}

interface HouseRobberInput {
  nums: number[];
}

const code = `function rob(nums: number[]): number {
  const n = nums.length;
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = nums[0];
  
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }
  
  return dp[n];
}`;

const title = "House Robber";

const getInput = () => ({ nums: [2, 7, 9, 3, 1] });

export const houseRobberProblem: Problem<
  HouseRobberInput,
  HouseRobberState
> = {
  title: title,
  code: code,
  getInput: getInput,
  func: rob,
};
