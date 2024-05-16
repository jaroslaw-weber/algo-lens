
// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../utils";

// Defines the interface for the input expected by the insertInterval function
interface InsertIntervalInput {
  intervals: number[][]; // 2D array of intervals
  newInterval: number[]; // new interval to be inserted
}

/**
 * Inserts a new interval into a sorted array of intervals.
 * @param p - The input parameters including an array of intervals and a new interval to be inserted.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function insertInterval(p: InsertIntervalInput): ProblemState[] {
  const { intervals, newInterval } = p;
  const steps: ProblemState[] = [];
  let result: number[][] = [];

  // Helper function to create and log each step's computational state
  function log(point: number, intervals?: number[][], newInterval?: number[]) {
    const step: ProblemState = {
      breakpoint:point,
      variables: [as2dArray("intervals", intervals, [])],
    };
    if (newInterval) {
      step.variables.push(asArray("newInterval", newInterval));
    }
    step.breakpoint = point;
    steps.push(step);
  }

  // Initial state log before the loop starts
  log(1, intervals, newInterval);

  // Initialize pointers for the merged result and the current interval index
  let i = 0, j = 0;

  // Add all intervals that come before the 'newInterval'
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
    log(2, intervals, newInterval);
  }

  // Merge all overlapping intervals to 'newInterval'
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
    i++;
    log(3, intervals, newInterval);
  }

  // Insert the 'newInterval'
  result.push(newInterval);
  log(4, intervals, newInterval);

  // Add all remaining intervals to the output
  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
    log(5, intervals, newInterval);
  }

  return steps;
}

// Example implementation of the insertInterval function for demonstration and testing
const code = `function insertInterval(intervals, newInterval) {
  //#1 Initialize the result array to store the merged intervals
  let result = [];

  //#2 Initialize two pointers, i and j, to track the merged result and the current interval index
  let i = 0, j = 0;

  //#3 Add all intervals that come before the 'newInterval'
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  //#4 Merge all overlapping intervals to 'newInterval'
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
    i++;
  }

  //#5 Insert the 'newInterval'
  result.push(newInterval);

  //#6 Add all remaining intervals to the output
  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Insert Interval";
const getInput = () => ({
  intervals: [[1, 3], [6, 9]],
  newInterval: [2, 5],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const insertIntervalProblem: Problem<InsertIntervalInput, ProblemState> = {
  title,
  code,
  getInput,
  func: insertInterval,
  id: "insert-interval",
};