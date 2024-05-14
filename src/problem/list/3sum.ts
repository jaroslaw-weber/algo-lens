
// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState } from "../types";
import {
  asArray,
  as3dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../utils";

// Defines the interface for the input expected by the threeSum function
interface ThreeSumInput {
  nums: number[];
}

/**
 * Implements the 3sum algorithm which finds all triplets in the array that sum up to 0.
 * @param p - The input parameters including an array of numbers.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function threeSum(p: ThreeSumInput): ProblemState[] {
  const { nums } = p;
  const steps: ProblemState[] = [];
  const result: number[][] = [];

  // Helper function to create and log each step's computational state
  function logStep(point: number, triplet?: number[]) {
    const step: ProblemState = {
      variables: [asArray("nums", nums)],
      breakpoint: point,
    };
    if (triplet) {
      step.variables.push(asSimpleValue({ result: JSON.stringify(triplet) }));
    }
    steps.push(step);
  }

  // Initial state log before the loop starts
  logStep(1);

  // Main loop to check triplets
  for (let i = 0; i < nums.length; i++) {
    //#2 Skip the duplicate values to avoid duplicates in the result
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    //#3 Start the loop to find the remaining two numbers that sum up to 0
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      logStep(3, [nums[i], nums[left], nums[right]]);

      if (sum < 0) {
        //#4 If the sum is less than 0, move the left pointer to the right to increase the sum
        left++;
      } else if (sum > 0) {
        //#5 If the sum is greater than 0, move the right pointer to the left to decrease the sum
        right--;
      } else {
        //#6 If the sum is equal to 0, add the triplet to the result and move both pointers
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;

        //#7 Skip the duplicate values to avoid duplicates in the result
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      }
    }
  }

  return steps;
}

// Example implementation of the threeSum function for demonstration and testing
const code = `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum < 0) {
        left++;
      } else if (sum > 0) {
        right--;
      } else {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;

        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      }
    }
  }

  return result;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "3Sum";
const getInput = () => ({
  nums: [-1, 0, 1, 2, -1, -4],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const threeSumProblem: Problem<ThreeSumInput, ProblemState> = {
  title,
  code,
  getInput,
  func: threeSum,
  id: "3sum",
};
