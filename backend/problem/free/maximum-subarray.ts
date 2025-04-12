// Imports specific utility functions and type definitions from the relative paths
import { sum } from "lodash";
import { Problem, ProblemState, Variable } from "../core/types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../core/utils";

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
  //for displaying
  const configMax = sum(nums.filter((x) => x > 0));

  // Helper function to create and log each step's computational state
  function log(point: number, i?: number) {
    const v: Variable[] = [];
    const step: ProblemState = {
      variables: v,
      breakpoint: point,
    };
    v.push(asArray("nums: start - end", nums, start, end));
    v.push(asArray("nums: tempStart", nums, tempStart));
    if (i !== undefined) {
      v.push(asArray("nums: i", nums, i));
    }
    v.push(
      asValueGroup(
        "max",
        { maxCurrent, maxGlobal },
        { min: -configMax, max: configMax }
      )
    );

    steps.push(step);
  }

  // Initial state log before the loop starts
  log(1);

  // Main loop to find the maximum subarray
  for (let i = 0; i < nums.length; i++) {
    log(2, i);
    if (i === 0 || nums[i] > maxCurrent + nums[i]) {
      //#2 Reset maxCurrent and tempStart when a greater number is found
      log(3, i);
      maxCurrent = nums[i];
      tempStart = i;
      log(4, i);
    } else {
      log(5, i);
      //#3 Accumulate maxCurrent
      maxCurrent += nums[i];
      log(6, i);
    }

    log(7, i);
    //#4 Update maxGlobal if maxCurrent is greater
    if (maxCurrent > maxGlobal) {
      log(8, i);
      maxGlobal = maxCurrent;
      start = tempStart;
      end = i;
      log(9, i);
    }

    log(10, i);
  }

  // Logs the final state
  log(11);

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
      //#3
      maxCurrent = nums[i];
      tempStart = i;
      //#4
    } else {
      //#5 Accumulate maxCurrent
      maxCurrent += nums[i];
      //#6
    }

    //#7 Update maxGlobal if maxCurrent is greater
    if (maxCurrent > maxGlobal) {
      //#8
      maxGlobal = maxCurrent;
      start = tempStart;
      end = i;
      //#9
    }
    //#10
  }

  //#11 Return the maximum subarray sum
  return maxGlobal;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Maximum Subarray";
const getInput = () => ({
  nums: [-2, 2, 1, -9, 4, -7, 2, 1, 1, 5, -5, 4],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const maxSubArrayProblem: Problem<MaxSubArrayInput, ProblemState> = {
  title,
  code,
  getInput,
  func: maxSubArray,
  id: "maximum-subarray",
  tags: ["dynamic programming"],
};
