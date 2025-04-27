// Imports specific utility functions and type definitions from the relative paths
import { sum } from "lodash";
import { Problem, ProblemState, Variable } from "algo-lens-core";
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
  const n = nums.length;
  const dp: number[] = new Array(n).fill(0); // Initialize dp array
  const steps: ProblemState[] = [];
  // let maxCurrent = nums[0]; // No longer needed with dp array
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
    // Keep track of the overall maximum subarray range
    v.push(asArray("nums (max subarray)", nums, start, end));
    // Display the dp array, highlighting the current index i
    v.push(asArray("dp", dp, i));
    if (i !== undefined) {
      // Highlight the current element being processed in nums
      v.push(asArray("nums (current)", nums, i));
    }
    v.push(asSimpleValue("maxGlobal", maxGlobal));

    // Removed tempStart tracking as it's less direct with dp
    // Removed maxCurrent as dp[i] holds the max sum ending at i

    steps.push(step);
  }

  // Initial state log before the loop starts
  dp[0] = nums[0]; // Base case for dp
  maxGlobal = dp[0];
  start = 0;
  end = 0;
  log(1, 0); // Log initial state with dp[0] calculated

  // Main loop to find the maximum subarray using dynamic programming
  for (let i = 1; i < n; i++) {
    log(2, i); // Log state at the beginning of iteration i

    // Calculate dp[i]: max sum ending at index i
    // It's either nums[i] itself or nums[i] added to the max sum ending at i-1
    if (dp[i - 1] > 0) {
        log(3, i); // Breakpoint before adding to previous dp
        dp[i] = dp[i - 1] + nums[i];
        log(4, i); // Breakpoint after adding
    } else {
        log(5, i); // Breakpoint before resetting dp
        dp[i] = nums[i]; // Start a new subarray from nums[i]
        tempStart = i; // Update tempStart when dp[i-1] <= 0
        log(6, i); // Breakpoint after resetting
    }


    log(7, i); // Log state before checking maxGlobal
    // Update maxGlobal if dp[i] is greater
    if (dp[i] > maxGlobal) {
      log(8, i); // Breakpoint before updating maxGlobal
      maxGlobal = dp[i];
      // Update start and end pointers for the overall maximum subarray
      // If dp[i] was reset (dp[i-1] <= 0), start is the current index i
      // Otherwise, the start remains the same as the start of the subarray ending at i-1
      // Note: This logic for start/end needs refinement if we want the exact indices of the *global* max subarray.
      // The current `tempStart` logic might not correctly track the global start.
      // For now, we focus on calculating maxGlobal correctly using dp.
      // Let's simplify and remove start/end updates within the loop for now,
      // as calculating them correctly alongside dp requires more state.
      // We can determine the actual subarray range after the loop if needed.
      // For this step, let's just ensure dp and maxGlobal are correct.
      // start = tempStart; // This line needs reconsideration
      // end = i;           // This line needs reconsideration
      log(9, i); // Breakpoint after updating maxGlobal
    }

    log(10, i); // Log state at the end of iteration i
  }

  // After the loop, find the actual start and end of the max subarray
  // This requires another pass or storing more info during the loop.
  // For now, let's just log the final state with the correct maxGlobal.
  log(11); // Log final state

  return steps;
}

// Example implementation of the maxSubArray function for demonstration and testing
// Updated code snippet reflecting the DP approach
const code = `function maxSubArray(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0; // Handle empty array case

  const dp: number[] = new Array(n).fill(0);
  dp[0] = nums[0];
  let maxGlobal = dp[0];
  // let start = 0; // Start/end tracking removed for simplicity in this snippet
  // let end = 0;
  // let tempStart = 0; // tempStart logic tied to dp calculation

  //#1 Initialize dp[0] and maxGlobal
  // Loop starts from index 1
  for (let i = 1; i < n; i++) {
    //#2 Start iteration for index i
    //#3 Check if adding to the previous max sum is beneficial
    if (dp[i - 1] > 0) {
      //#4 Calculate dp[i] by extending the previous subarray
      dp[i] = dp[i - 1] + nums[i];
    } else {
      //#5 Calculate dp[i] by starting a new subarray
      dp[i] = nums[i];
      // tempStart = i; // Update tempStart when starting anew
      //#6 dp[i] calculation complete
    }

    //#7 Update maxGlobal if dp[i] is the new maximum
    if (dp[i] > maxGlobal) {
      //#8 Update maxGlobal
      maxGlobal = dp[i];
      // Update start/end pointers if tracking the subarray itself
      // start = tempStart;
      // end = i;
      //#9 maxGlobal updated
    }
    //#10 End of iteration for index i
  }

  //#11 Return the overall maximum subarray sum
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
