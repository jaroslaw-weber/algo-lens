import { sum } from "lodash";
import { Problem, ProblemState, Variable } from "algo-lens-core";
import { asArray, asSimpleValue, asValueGroup } from "algo-lens-core/src/utils";

function rob(houses: HouseRobberInput): ProblemState[] {
  const s: ProblemState[] = [];
  const { nums } = houses;
  const groupOptions = { min: 0, max: sum(houses.nums) };
  const n = nums.length;
  const dp: number[] = new Array(n + 1).fill(0);
  dp[0] = 0;
  s.push({
    variables: [asArray("nums", nums), asArray("dp", dp)],
    breakpoint: 1,
  }); //#1

  dp[1] = nums[0];
  s.push({
    variables: [asArray("nums", nums), asArray("dp", dp)],
    breakpoint: 2,
  }); //#2

  for (let i = 2; i <= n; i++) {
    const skipCurrent = dp[i - 1];
    const twoHousesBefore = dp[i - 2];
    const currentHouse = nums[i - 1];
    const includeCurrent = twoHousesBefore + currentHouse;
    dp[i] = Math.max(skipCurrent, includeCurrent);
    s.push({
      variables: [
        asArray("nums", nums,  i - 1),
        asArray("dp", dp, i, i - 1, i - 2),
        asValueGroup("max profit",{
          skipCurrent,
          includeCurrent,
          twoHousesBefore,
          currentHouse,
        }, groupOptions),
        asValueGroup("loop", { i }, groupOptions),
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
    const skipCurrent = dp[i - 1];
    const currentHouse = nums[i - 1];
    const twoHousesBefore = dp[i - 2];
    const includeCurrent = twoHousesBefore + currentHouse;
    dp[i] = Math.max(skipCurrent, includeCurrent);  
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
  tested: true,
  tags: ["dynamic programming"],
};
