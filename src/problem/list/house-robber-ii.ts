
// House Robber II

import { Problem, ProblemState } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../utils";

// Defines the interface for the input expected by the houseRobberII function
interface HouseRobberIIInput {
  nums: number[];
}

/**
 * Implements the house robber II algorithm which calculates the maximum sum that can be obtained by robbing houses.
 * @param p - The input parameters including an array of house values.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function houseRobberII(p: HouseRobberIIInput): ProblemState[] {
  const { nums } = p;
  const steps: ProblemState[] = [];

  // Helper function to create and log each step's computational state
  function logStep(point: number, dp?: number[], maxSum?: number) {
    const step: ProblemState = {
      variables: [asArray("nums", nums)],
      breakpoint: point,
    };
    if (dp !== undefined) {
      step.variables.push(asArray("dp", dp));
    }
    if (maxSum !== undefined) {
      step.variables.push(asSimpleValue({ maxSum }));
    }
    steps.push(step);
  }

  // Initial state log before the loop starts
  logStep(1);

  const n = nums.length;
  let dp1 = new Array(n - 1).fill(0);
  let dp2 = new Array(n).fill(0);

  dp1[0] = nums[0];
  dp1[1] = Math.max(nums[0], nums[1]);

  // Main loop to calculate the maximum sum for the first n-1 houses
  for (let i = 2; i < n - 1; i++) {
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + nums[i]);
    logStep(2, dp1);
  }

  dp2[0] = 0;
  dp2[1] = nums[1];

  // Main loop to calculate the maximum sum for the last n houses
  for (let i = 2; i < n; i++) {
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + nums[i]);
    logStep(3, dp2);
  }

  const maxSum = Math.max(dp1[n - 2], dp2[n - 1]);
  logStep(4, dp1, maxSum);
  logStep(5, dp2, maxSum);

  return steps;
}

// Example implementation of the houseRobberII function for demonstration and testing
const code = `function houseRobberII(nums: number[]): number {
  const n = nums.length;
  const dp1 = new Array(n - 1).fill(0);
  const dp2 = new Array(n).fill(0);

  dp1[0] = nums[0];
  dp1[1] = Math.max(nums[0], nums[1]);

  //#1 Calculate the maximum sum for the first n-1 houses
  for (let i = 2; i < n - 1; i++) {
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + nums[i]);
  }

  dp2[0] = 0;
  dp2[1] = nums[1];

  //#2 Calculate the maximum sum for the last n houses
  for (let i = 2; i < n; i++) {
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + nums[i]);
  }

  //#3 Return the maximum sum
  return Math.max(dp1[n - 2], dp2[n - 1]);
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "House Robber II";
const getInput = () => ({
  nums: [2, 3, 2, 3, 3, 1, 4, 5, 5],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const houseRobberIIP problema: Problem<HouseRobberIIInput, ProblemState> = {
  title,
  code,
  getInput,
  func: houseRobberII,
  id: "house-robber-ii",
};