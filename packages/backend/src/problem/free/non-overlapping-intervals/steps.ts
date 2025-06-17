import { ProblemState, Variable } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import {
  asValueGroup,
  asIntervals,
  getIntervalBounds,
} from "algo-lens-core/src/utils";
import { EraseOverlapIntervalsInput } from "./types"; // Import EraseOverlapIntervalsInput

export function generateSteps(intervals: number[][]): ProblemState[] {
  // Renamed and Exported
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2

  let removalCount = 0; //#1 Initialize removal count
  const remainingIntervals: number[][] = [];

  // Define variable scopes and types for the logger
  const { min, max } = getIntervalBounds(intervals);

  // Initial state log before the loop starts
  l.intervals("intervals", intervals, [], min, max); // Assuming intervals is number[][]
  l.intervals("remainingIntervals", remainingIntervals, [], min, max); // Assuming remainingIntervals is number[][]
  l.simple({ removalCount });
  l.comment = `Initialize removal count and remaining intervals.`; // Set comment before breakpoint
  l.breakpoint(1);

  intervals.sort((a, b) => a[1] - b[1]); //#2 Sort the intervals by end points
  l.comment = `Sort intervals by end points.`; // Set comment before breakpoint
  l.breakpoint(2);

  let lastEnd = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < intervals.length; i++) {
    const currentStart = intervals[i][0];
    const currentEnd = intervals[i][1];
    l.intervals("intervals", intervals, [i], min, max);
    l.intervals("remainingIntervals", remainingIntervals, [], min, max);
    l.comment = `Iterate through the sorted intervals. For the current interval [${currentStart}, ${currentEnd}], compare its start time (${currentStart}) with the end time of the last selected non-overlapping interval (${lastEnd}).`; // Set comment before breakpoint
    l.breakpoint(3);
    if (currentStart < lastEnd) {
      // Increment removal count if there is an overlap
      removalCount++;
      l.simple({ removalCount });
      l.comment = `Overlap detected. Increment removal count.`; // Set comment before breakpoint
      l.breakpoint(4);
    } else {
      // Update the end point and record the interval
      lastEnd = currentEnd;
      remainingIntervals.push(intervals[i]);
      l.comment = `No overlap. Keep interval, update lastEnd.`; // Set comment before breakpoint
      l.breakpoint(5);
    }
  }
  const result = removalCount;
  l.intervals("intervals", intervals, [], min, max);
  l.intervals("remainingIntervals", remainingIntervals, [], min, max);
  l.comment = `All intervals processed. Result: ${result}.`; // Set comment before breakpoint
  l.simple({ result });
  l.breakpoint(6);

  return l.getSteps(); // Return steps from the logger
}

// Removed EraseOverlapIntervalsInput interface, code, title, getInput, tested flag, Problem export
