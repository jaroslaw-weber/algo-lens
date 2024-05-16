
import { Problem, ProblemState } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../utils";

interface Interval {
  start: number;
  end: number;
}

interface MergeIntervalsInput {
  intervals: Interval[];
}

export function mergeIntervals(p: MergeIntervalsInput): ProblemState[] {
  const { intervals } = p;
  const steps: ProblemState[] = [];
  let current = 0;

  // Helper function to create and log each step's computational state
  function log(point: number, intervals?: Interval[]) {
    const step: ProblemState = {
      variables: [asArray("intervals", intervals)],
      breakpoint: point,
    };
    steps.push(step);
  }

  // Sort the intervals based on the start time
  intervals.sort((a, b) => a.start - b.start); //#1

  log(1);

  let result: Interval[] = [intervals[0]]; //#2

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i]; //#3
    const lastInterval = result[result.length - 1]; //#4

    if (currentInterval.start <= lastInterval.end) {
      result[result.length - 1].end = Math.max(lastInterval.end, currentInterval.end); //#5
    } else {
      result.push(currentInterval); //#6
    }

    log(2, result);
  }

  log(3, result);

  return steps;
}

// Example implementation of the mergeIntervals function for demonstration and testing
const code = `function mergeIntervals(intervals: Interval[]): Interval[] {
  //#1 Sort the intervals based on the start time
  intervals.sort((a, b) => a.start - b.start);

  //#2 Initialize the result with the first interval
  let result = [intervals[0]];

  //#3 Iterate through the intervals
  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i];
    const lastInterval = result[result.length - 1];

    //#4 Check if the current interval overlaps with the last one in the result
    if (currentInterval.start <= lastInterval.end) {
      //#5 Merge the intervals by updating the end of the last interval
      result[result.length - 1].end = Math.max(lastInterval.end, currentInterval.end);
    } else {
      //#6 Add the current interval to the result
      result.push(currentInterval);
    }
  }

  return result;
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Merge Intervals";
const getInput = () => ({
  intervals: [
    { start: 1, end: 3 },
    { start: 2, end: 6 },
    { start: 8, end: 10 },
    { start: 15, end: 18 },
  ],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const mergeIntervalsProblem: Problem<MergeIntervalsInput, ProblemState> = {
  title,
  code,
  getInput,
  func: mergeIntervals,
  id: "merge-intervals",
};
