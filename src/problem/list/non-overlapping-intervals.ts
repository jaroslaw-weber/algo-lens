// Imports specific utility functions and type definitions from the relative paths
import { IntervalVariable, Problem, ProblemState, Variable } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
  asIntervals,
  getIntervalBounds,
} from "../utils";

// Defines the interface for the input expected by the eraseOverlapIntervals function
interface EraseOverlapIntervalsInput {
  intervals: number[][];
}

/**
 * Implements the eraseOverlapIntervals algorithm which removes overlapping intervals.
 * @param p - The input parameters including an array of intervals.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function eraseOverlapIntervals(
  p: EraseOverlapIntervalsInput
): ProblemState[] {
  const { intervals } = p;
  const steps: ProblemState[] = [];
  let lastNonOverlapIndex = -1; //#1 Initialize the last non-overlapping index
  const nonOverlappingIntervals: number[][] = [];

  // Helper function to create and log each step's computational state
  function log(point: number, i?: number) {
    const v: Variable[] = [];
    const step: ProblemState = {
      variables: v,
      breakpoint: point,
    };
    const { min, max } = getIntervalBounds(intervals);
    v.push(asIntervals("intervals", intervals, [i], min, max));
    v.push(
      asIntervals(
        "nonOverlappingIntervals",
        nonOverlappingIntervals,
        [lastNonOverlapIndex],
        min,
        max
      )
    );
    steps.push(step);
  }

  // Initial state log before the loop starts
  log(1);

  // Sort the intervals by their end points
  intervals.sort((a, b) => a[1] - b[1]); //#3 Sort the intervals
  log(2);
  for (let i = 0; i < intervals.length; i++) {
    const current = intervals[i];
    const currentStart = current[0];
    const lastNonOverlapping = nonOverlappingIntervals[lastNonOverlapIndex];
    const lastNonOverlappingEnd = lastNonOverlapping?.[1];
    log(3, i); //#4 Iterate through the intervals
    if (lastNonOverlapIndex === -1 || currentStart >= lastNonOverlappingEnd) {
      log(4, i); //#6 Update the result
      //#5 Check for non-overlap with the last non-overlapping interval
      nonOverlappingIntervals.push(current);
      lastNonOverlapIndex++;
      log(5, i); //#6 Update the result
    }
  }

  log(6); //#7

  return steps;
}

// Example implementation of the eraseOverlapIntervals function for demonstration and testing
const code = `function eraseOverlapIntervals(intervals: number[][]): number[][] {
  //#1 Initialize the result array
  const nonOverlappingIntervals: number[][] = [];

  //Sort the intervals by their end points
  intervals.sort((a, b) => a[1] - b[1]);

  //#2 Initialize the last non-overlapping index
  let lastNonOverlapIndex = -1;

  // Iterate through the intervals
  for (let i = 0; i < intervals.length; i++) {
    const current = intervals[i]; 
    const currentStart = current[0];
    const lastNonOverlapping = nonOverlappingIntervals[lastNonOverlapIndex];
    const lastNonOverlappingEnd = lastNonOverlapping?.[1];
    //#3 Check for non-overlap with the last non-overlapping interval
    if (lastNonOverlapIndex === -1 || currentStart >= lastNonOverlappingEnd) {
      //#4 Update the result
      nonOverlappingIntervals.push(intervals[i]);
      lastNonOverlapIndex++;
      //#5
    }
  }

  //#6 Return the non-overlapping intervals
  return nonOverlappingIntervals;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Erase Overlapping Intervals";
const getInput = () => ({
  intervals: [
   
    [1, 3],
    [2, 6],
    [5, 9],
    [8, 10],
    [12, 15],
    [14, 18],
    [17, 20],
    [19, 22],
  ],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const eraseOverlapIntervalsProblem: Problem<
  EraseOverlapIntervalsInput,
  ProblemState
> = {
  title,
  code,
  getInput,
  func: eraseOverlapIntervals,
  id: "erase-overlap-intervals",
};
