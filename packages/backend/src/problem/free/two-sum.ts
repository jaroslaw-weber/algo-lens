import { Problem, ProblemState, Variable } from "algo-lens-core";
import {
  asArray,
  asSimpleValue,
  asHashset,
  asBooleanGroup,
  asHashmap
} from "algo-lens-core/src/utils";

interface TwoSumInput {
  nums: number[];
  target: number;
}

export function twoSum(p: TwoSumInput): ProblemState[] {
  const { nums, target } = p;
  const steps: ProblemState[] = [];
  const seen = new Map<number, number>();

  function log(point: number, index?: number, complement?: number, result?: number[], complementIndex?: number) {
    const v: Variable[] = [];
    const step: ProblemState = {
      variables: v,
      breakpoint: point,
    };
    v.push(...asSimpleValue({target}))
    v.push(asArray("nums", nums, index, complement));
    v.push(asHashmap("seen", seen, { value: nums[complementIndex??index], color:complementIndex?'error':'primary' }));
    
    if (result !== undefined) {
      v.push(asArray('result', result));
    }
    steps.push(step);
  }

  log(1);

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    const existsInSet = seen.has(complement);
    
    log(2, i, complement, undefined);

    if (existsInSet) {
      const complementIndex = seen.get(complement);
      log(3, i, complement, [seen.get(complement), i],complementIndex );
      return steps;
    }

    seen.set(nums[i], i);
    log(4, i, complement);
  }

  log(5);
  return steps;
}

export const twoSumProblem: Problem<TwoSumInput, ProblemState> = {
  title: "Two Sum",
  code: `function twoSum(nums: number[], target: number): number[] {
    const seen = new Map();
    //#1
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      const need = target - num;
      //#2
      if (seen.has(need)) {
        //#3
        return [seen.get(need), i];
      }
      seen.set(num, i);
    }
    return [-1, -1];
  }`,
  getInput: () => ({
    nums: [2, 7, 11, 15, 21, 29, 35, 40, 45, 55, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125],
    target: 130
  }),
  func: twoSum,
  id: "two-sum",
  tags: ["array", "hash set"],
  tested: true
};
