import { Problem, ProblemState, Variable } from "algo-lens-core";
import {
  asArray,
  asSimpleValue,
  asHashset,
  asBooleanGroup,
  asHashmap
} from "../core/utils";

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

export const problem: Problem<TwoSumInput, ProblemState> = {
  title: "Two Sum",
  emoji: '🎯',
  code: `function twoSum(nums: number[], target: number): number[] {
    const seen = new Map();
    //#1 Initialize an empty hash map 'seen'.
    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      const complement = target - num;
      //#2 Calculate complement and check if it exists in 'seen'.
      if (seen.has(complement)) {
        //#3 Complement found, return indices.
        return [seen.get(complement), i];
      }
      //#4 Complement not found, add current number and index to 'seen'.
      seen.set(num, i);
    }
    //#5 Loop finished, no solution found (though problem guarantees one).
    return [-1, -1]; // Should be unreachable based on problem description
  }`,
  func: twoSum, // Keep the reference to the old function for now, it might be removed later
  id: "two-sum",
  tags: ["array", "hash set"],
};
