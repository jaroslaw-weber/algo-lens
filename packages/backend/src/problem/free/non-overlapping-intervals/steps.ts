import { ProblemState, Variable } from "algo-lens-core"; // Removed IntervalVariable, Problem
import {
  // Removed unused imports
  asValueGroup,
  asIntervals,
  getIntervalBounds,
} from "../../core/utils";
import { EraseOverlapIntervalsInput } from "./types"; // Import EraseOverlapIntervalsInput

export function generateSteps( // Renamed and Exported
  p: EraseOverlapIntervalsInput
): ProblemState[] {
  const { intervals } = p;
  const steps: ProblemState[] = [];
  let removalCount = 0; //#1 Initialize removal count
  const remainingIntervals: number[][] = [];

  function log(point: number, i?: number) {
    const v: Variable[] = [];
    const step: ProblemState = {
      variables: v,
      breakpoint: point,
    };
    const { min, max } = getIntervalBounds(intervals);
    v.push(asIntervals("intervals", intervals, [i], min, max));
    v.push(asIntervals("remainingIntervals", remainingIntervals, [], min, max));
    v.push(
      asValueGroup(
        "removalCount",
        { removalCount },
        { min: 0, max: intervals.length }
      )
    );
    steps.push(step);
  }

  // Initial state log before the loop starts
  log(1);

  intervals.sort((a, b) => a[1] - b[1]); //#2 Sort the intervals by end points
  log(2);
  let lastEnd = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < intervals.length; i++) {
    const currentStart = intervals[i][0];
    const currentEnd = intervals[i][1];
    log(3, i); //#3 Iterate through the intervals
    if (currentStart < lastEnd) {
      // Increment removal count if there is an overlap
      removalCount++;
      log(4, i); //#4 Log overlapping case
    } else {
      // Update the end point and record the interval
      lastEnd = currentEnd;
      remainingIntervals.push(intervals[i]);
      log(5, i); //#5 Update non-overlapping intervals
    }
  }

  // log(6); //#6 Final log after all calculations - Removed

  // Add the final state explicitly with the result variable correctly labeled
  const finalBounds = getIntervalBounds(intervals); // Calculate bounds once
  const finalState: ProblemState = {
    variables: [
       asIntervals("intervals", intervals, [], finalBounds.min, finalBounds.max), // Show original intervals
       asIntervals("remainingIntervals", remainingIntervals, [], finalBounds.min, finalBounds.max), // Show final remaining
       asValueGroup("result", { result: removalCount }, { min: 0, max: intervals.length }) // Label result correctly
    ],
    breakpoint: 6, // Keep the breakpoint marker
  };
  steps.push(finalState);


  return steps;
}

// Removed EraseOverlapIntervalsInput interface, code, title, getInput, tested flag, Problem export
