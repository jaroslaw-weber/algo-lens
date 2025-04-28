import { ProblemState, Variable } from "algo-lens-core"; // Removed IntervalVariable, Problem
import {
  // Removed unused imports
  asIntervals,
  getIntervalBounds,
} from "../core/utils";
import { MergeIntervalsInput } from "./types"; // Import MergeIntervalsInput

export function generateSteps(p: MergeIntervalsInput): ProblemState[] { // Renamed and Exported
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

// Removed MergeIntervalsInput interface, code, title, getInput, Problem export
