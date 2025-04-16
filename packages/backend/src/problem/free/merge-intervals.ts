import { IntervalVariable, Problem, ProblemState, Variable } from "algo-lens-core";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
  asIntervals,
  getIntervalBounds,
} from "algo-lens-core/src/utils";

interface MergeIntervalsInput {
  intervals: number[][];
}

export function mergeIntervals(p: MergeIntervalsInput): ProblemState[] {
  const { intervals } = p;
  const steps: ProblemState[] = [];
  
  // Initialize the variable for merged intervals
  const mergedIntervals: number[][] = [];

  // Helper function to create and log each step's computational state
  function log(point: number, i?: number) {
    const v: Variable[] = [];
    const step: ProblemState = {
      variables: v,
      breakpoint: point,
    };
    const { min, max } = getIntervalBounds(intervals);
    v.push(asIntervals("intervals", intervals, [i], min, max));
    v.push(asIntervals("mergedIntervals", mergedIntervals, [], min, max));
    steps.push(step);
  }

  log(1);
  // Sort the intervals based on the start time
  intervals.sort((a, b) => a[0] - b[0]);
  log(2);

  mergedIntervals.push(intervals[0]);

  for (let i = 1; i < intervals.length; i++) {
    const currentStart = intervals[i][0];
    const currentEnd = intervals[i][1];
    const lastInterval = mergedIntervals[mergedIntervals.length - 1];
    const lastEnd = lastInterval[1];

    log(3, i);
    
    if (currentStart <= lastEnd) {
      lastInterval[1] = Math.max(lastEnd, currentEnd);
      log(4, i);
    } else {
      mergedIntervals.push(intervals[i]);
      log(5, i);
    }
  }

  log(6);
  return steps;
}

const code = `function merge(intervals: number[][]): number[][] {
  //#1 Sort intervals by their start points
  intervals.sort((a, b) => a[0] - b[0]);
  let merged = [intervals[0]];

  //#2 Start iterating through the intervals
  for (let i = 1; i < intervals.length; i++) {
    //#3 Check if the current interval starts before the last merged interval ends
    if (intervals[i][0] <= merged[merged.length - 1][1]) {
      //#4 If there is overlap, merge the current interval with the last one in merged
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], intervals[i][1]);
    } else {
      //#5 If no overlap, add the current interval to merged
      merged.push(intervals[i]);
    }
  }

  //#6 All intervals processed, return the merged intervals
  return merged;
}`;




const title = "Merge Intervals";
const getInput = () => ({
  intervals: [
    [21, 23], // No overlap
    [2, 5],   // Overlaps with [1, 4]
    [14, 16], // No overlap
    [17, 20], // No overlap
    [8, 12],  // Overlaps with [6, 10], [11, 13]
    [11, 13], // Overlaps with [8, 12]
    [22, 25], // Overlaps with [21, 23]
    [6, 10],  // Overlaps with [8, 12]
    [1, 4],   // Overlaps with [2, 5]
  ],
});

export const mergeIntervalsProblem: Problem<
  MergeIntervalsInput,
  ProblemState
> = {
  title,
  code,
  getInput,
  func: mergeIntervals,
  id: "merge-intervals",
  tested: true,
  tags: ["interval"]
};
