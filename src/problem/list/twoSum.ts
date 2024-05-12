
import { Problem, ProblemState } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../utils";

interface TwoSumInput {
  nums: number[];
  target: number;
}

export function twoSum(p: TwoSumInput): ProblemState[] {
  const { nums, target } = p;
  const steps: ProblemState[] = [];

  let left = 0;
  let right = nums.length - 1;
  steps.push({
    variables: [
      asValueGroup("left", { left }, { min: 0, max: nums.length }),
      asValueGroup("right", { right }, { min: 0, max: nums.length }),
      asArray("nums", nums),
    ],
    breakpoint: 1,
  });

  while (left < right) {
    const sum = nums[left] + nums[right];
    steps.push({
      variables: [
        asValueGroup("left", { left }, { min: 0, max: nums.length }),
        asValueGroup("right", { right }, { min: 0, max: nums.length }),
        ...asSimpleValue( { sum }),
        asArray("nums", nums),
      ],
      breakpoint: 2,
    });

    if (sum === target) {
      steps.push({
        variables: [
          asValueGroup("left", { left }, { min: 0, max: nums.length }),
          asValueGroup("right", { right }, { min: 0, max: nums.length }),
          asArray("nums", nums),
          ...asSimpleValue({ result: [left, right] }),
        ],
        breakpoint: 3,
      });
      return steps;
    } else if (sum < target) {
      left++;
      steps.push({
        variables: [
          asValueGroup("left", { left }, { min: 0, max: nums.length }),
          asValueGroup("right", { right }, { min: 0, max: nums.length }),
          asArray("nums", nums),
          ...asSimpleValue({ result: [left, right] }),
        ],
        breakpoint: 4,
      });
      return steps;
    } else {
      right--;
      steps.push({
        variables: [
          asValueGroup("left", { left }, { min: 0, max: nums.length }),
          asValueGroup("right", { right }, { min: 0, max: nums.length }),
          asArray("nums", nums),
          ...asSimpleValue({ result: [left, right] }),
        ],
        breakpoint: 5,
      });
      return steps;
    }
  }

  steps.push({
    variables: [
      asValueGroup("left", { left }, { min: 0, max: nums.length }),
      asValueGroup("right", { right }, { min: 0, max: nums.length }),
      asArray("nums", nums),
    ],
    breakpoint: 4,
  });

  return steps;
}

const code = `function twoSum(nums: number[], target: number): number[] {
  // Initialize two pointers for the start and end of the array
  let left = 0;
  let right = nums.length - 1;

  //#1 Start the loop to find two numbers that sum to the target value
  while (left < right) {
    // Calculate the sum of the values at the two pointers
    const sum = nums[left] + nums[right];

    //#2 Check if the sum is equal to the target
    if (sum === target) {
      //#3 If the sum matches the target, return the indices of the two numbers
      return [left, right];
    } else if (sum < target) {
      //#4 If the sum is less than the target, move the left pointer to the right to increase the sum
      left++;
    } else {
      //#5 If the sum is greater than the target, move the right pointer to the left to decrease the sum
      right--;
    }
  }

  //#6 If no two numbers sum up to the target, return an empty array
  return [];
}`;


const title = "Two Sum";
const getInput = () => ({ nums: [2, 7, 11, 15], target: 9 });

export const twoSumProblem: Problem<TwoSumInput, ProblemState> = {
  title,
  code,
  getInput,
  func: twoSum,
  id: "two-sum",
};