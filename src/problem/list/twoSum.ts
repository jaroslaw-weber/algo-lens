// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../utils";

// Defines the interface for the input expected by the twoSum function
interface TwoSumInput {
  nums: number[];
  target: number;
}

/**
 * Implements the two-sum algorithm which finds two numbers that add up to a specific target.
 * @param p - The input parameters including an array of numbers and a target sum.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function twoSum(p: TwoSumInput): ProblemState[] {
  const { nums, target } = p;
  const steps: ProblemState[] = [];
  let left = 0;
  let right = nums.length - 1;

  // Helper function to create and log each step's computational state
  function logStep(point: number, sum?: number, result?: number[]) {
    const step: ProblemState = {
      variables: [asArray("nums", nums, left, right)],
      breakpoint: point,
    };
    if (sum !== undefined) {
      step.variables.push(
        asValueGroup("sum", { sum, target }, { min: 0, max: 2 * target })
      );
    }
    if (result) {
      step.variables.push(...asSimpleValue({ result: JSON.stringify(result) }));
    }
    steps.push(step);
  }

  // Initial state log before the loop starts
  logStep(1);

  // Main loop to check pairs
  while (left < right) {
    const sum = nums[left] + nums[right];
    logStep(2, sum);

    if (sum === target) {
      logStep(3, sum, [left, right]);
      break;
    } else if (sum < target) {
      left++;
      logStep(4, sum);
    } else {
      right--;
      logStep(5, sum);
    }
  }

  // Logs the final state if no two numbers add up to the target
  if (left >= right) {
    logStep(6);
  }

  return steps;
}

// Example implementation of the twoSum function for demonstration and testing
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

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Two Sum";
const getInput = () => ({
  nums: [
    2, 7, 11, 15, 21, 29, 35, 40, 45, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
    105, 110, 115, 120, 125,
  ],
  target: 130,
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const twoSumProblem: Problem<TwoSumInput, ProblemState> = {
  title,
  code,
  getInput,
  func: twoSum,
  id: "two-sum",
};
