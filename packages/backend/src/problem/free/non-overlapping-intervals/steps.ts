import { ProblemState, Variable } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import {
  asValueGroup,
  asIntervals,
  getIntervalBounds,
} from "../../core/utils";
import { EraseOverlapIntervalsInput } from "./types"; // Import EraseOverlapIntervalsInput

export function generateSteps( // Renamed and Exported
  p: EraseOverlapIntervalsInput
): ProblemState[] {
  const { intervals } = p;
  const logger = new StepLoggerV2(["intervals", "remainingIntervals", "removalCount", "i"]); // Instantiate StepLoggerV2

  let removalCount = 0; //#1 Initialize removal count
  const remainingIntervals: number[][] = [];

  // Define variable scopes and types for the logger
  const { min, max } = getIntervalBounds(intervals);


  // Initial state log before the loop starts
  logger.log(1, { intervals, remainingIntervals, removalCount }); //#1 Log initial state

  intervals.sort((a, b) => a[1] - b[1]); //#2 Sort the intervals by end points
  logger.log(2, { intervals, remainingIntervals, removalCount }); //#2 Log after sort

  let lastEnd = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < intervals.length; i++) {
    const currentStart = intervals[i][0];
    const currentEnd = intervals[i][1];
    logger.log(3, { intervals, remainingIntervals, removalCount, i }); //#3 Iterate through the intervals
    if (currentStart < lastEnd) {
      // Increment removal count if there is an overlap
      removalCount++;
      logger.log(4, { intervals, remainingIntervals, removalCount, i }); //#4 Log overlapping case
    } else {
      // Update the end point and record the interval
      lastEnd = currentEnd;
      remainingIntervals.push(intervals[i]);
      logger.log(5, { intervals, remainingIntervals, removalCount, i }); //#5 Update non-overlapping intervals
    }
  }

  logger.log(6, { intervals, remainingIntervals, removalCount }); //#6 Final log after all calculations
  logger.simple({ result: removalCount }); // Explicitly log the final result count

  return logger.getSteps(); // Return steps from the logger
}

// Removed EraseOverlapIntervalsInput interface, code, title, getInput, tested flag, Problem export
