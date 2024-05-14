
// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../utils";

// Defines the interface for the input expected by the maxSubArray function
interface MaxSubArrayInput {
  nums: number[];
}

/**
 * Implements the maximum-subarray algorithm which finds the maximum contiguous subarray and its sum.
 * @param p - The input parameters including an array of numbers.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function maxSubArray(p: MaxSubArrayInput): ProblemState[] {
  const { nums } = p;
  const steps: ProblemState[] = [];
  let maxCurrent = nums[0];
  let maxGlobal = nums[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;

  // Helper function to create and log each step's computational state
  function logStep(point: number, maxCurrent?: number, maxGlobal?: number) {
    const step: ProblemState = {
      variables: [asArray("nums", nums, start, end)],
      breakpoint:point
    };
    if (maxCurrent !== undefined) {
      step.variables.push(
        asValueGroup("maxCurrent", { maxCurrent, max: maxGlobal }, { min: -100, max: 100 })
      );
    }
    if (maxGlobal !== undefined) {
      step.variables.push(
        asValueGroup("maxGlobal", { maxGlobal, max: maxGlobal }, { min: -100, max: 100 })
      );
    }
    steps.push(step);
  }

  // Initial state log before the loop starts
  logStep(1);

  // Main loop to find the maximum subarray
  for (let i = 0; i < nums.length; i++) {
    if (i === 0 || nums[i] > maxCurrent + nums[i]) {
      //#2 Reset maxCurrent and tempStart when a greater number is found
      maxCurrent = nums[i];
      tempStart = i;
    } else {
      //#3 Accumulate maxCurrent
      maxCurrent += nums[i];
    }

    //#4 Update maxGlobal if maxCurrent is greater
    if (maxCurrent > maxGlobal) {
      maxGlobal = maxCurrent;
      start = tempStart;
      end = i;
    }

    logStep(5, maxCurrent, maxGlobal);
  }

  // Logs the final state
  logStep(6, maxCurrent, maxGlobal);

  return steps;
}

// Example implementation of the maxSubArray function for demonstration and testing
const code = `function maxSubArray(nums: number[]): number {
  let maxCurrent = nums[0];
  let maxGlobal = nums[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;

  //#1 Start the loop to find the maximum subarray
  for (let i = 0; i < nums.length; i++) {
    //#2 Reset maxCurrent and tempStart when a greater number is found
    if (i === 0 || nums[i] > maxCurrent + nums[i]) {
      maxCurrent = nums[i];
      tempStart = i;
    } else {
      //#3 Accumulate maxCurrent
      maxCurrent += nums[i];
    }

    //#4 Update maxGlobal if maxCurrent is greater
    if (maxCurrent > maxGlobal) {
      maxGlobal = maxCurrent;
      start = tempStart;
      end = i;
    }
  }

  //#5 Return the maximum subarray sum
  return maxGlobal;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Maximum Subarray";
const getInput = () => ({
  nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const maxSubArrayProblem: Problem<MaxSubArrayInput, ProblemState> = {
  title,
  code,
  getInput,
  func: maxSubArray,
  id: "max-subarray",
};
