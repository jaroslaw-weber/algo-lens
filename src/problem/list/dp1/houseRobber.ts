import { Problem, ProblemState, Variable } from "../../types";
import { asArray, asSimpleValue } from "../../utils";

function rob(houses: HouseRobberInput): ProblemState[] {
  const s: ProblemState[] = [];
  const { nums } = houses;
  const n = nums.length;
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 0;
  s.push({
    variables: [
      asArray("nums", nums),
      asArray("dp", dp),
    ],
    breakpoint: 1,
  }); //#1

  dp[1] = nums[0];
  s.push({
    variables: [
      asArray("nums", nums),
      asArray("dp", dp),
    ],
    breakpoint: 2,
  }); //#2

  for (let i = 2; i <= n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
    s.push({
      variables: [
        asArray("nums", nums),
        asArray("dp", dp, i, i - 1, i - 2),
        ...asSimpleValue({ i , "dp[i-1]":dp[i-1], "nums[i-1]":nums[i-1], "dp[i-2]":dp[i-2]}),
      ],
      breakpoint: 3,
    }); //#3
  }

  const result = dp[n];
  s.push({
    variables: [
      asArray("nums", nums),
      asArray("dp", dp, n),
      ...asSimpleValue({ result }),
    ],
    breakpoint: 4,
  }); //#4
  return s;
}

interface HouseRobberInput {
  nums: number[];
}

const code = `function rob(nums) {
  const n = nums.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 0; 
  //#1
  dp[1] = nums[0]; 
  //#2
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]); 
    //#3
  }
  const result = dp[n]; 
  //#4
  return result;
}`;

const title = "House Robber";
const getInput = () => ({ nums: [2, 7, 9, 3, 1] });

export const houseRobberProblem: Problem<HouseRobberInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: rob,
  id: "house-robber",
  tested:true
};
