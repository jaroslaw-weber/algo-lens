import { ProblemState, Variable } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import { asValueGroup, asIntervals, getIntervalBounds } from "../../core/utils";
import { EraseOverlapIntervalsInput } from "./types"; // Import EraseOverlapIntervalsInput

export function generateSteps(intervals: number[][]): ProblemState[] {
  // Renamed and Exported
  const logger = new StepLoggerV2(); // Instantiate StepLoggerV2

  let removalCount = 0; //#1 Initialize removal count
  const remainingIntervals: number[][] = [];

  // Define variable scopes and types for the logger
  const { min, max } = getIntervalBounds(intervals);

  // Initial state log before the loop starts
  logger.intervals("intervals", intervals, [], min, max); // Assuming intervals is number[][]
  logger.intervals("remainingIntervals", remainingIntervals, [], min, max); // Assuming remainingIntervals is number[][]
  logger.simple({ removalCount });
  logger.comment = "Log initial state"; // Set comment before breakpoint
  logger.breakpoint(1);

  intervals.sort((a, b) => a[1] - b[1]); //#2 Sort the intervals by end points
  logger.comment = "Log after sort"; // Set comment before breakpoint
  logger.breakpoint(2);

  let lastEnd = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < intervals.length; i++) {
    const currentStart = intervals[i][0];
    const currentEnd = intervals[i][1];
    logger.intervals("intervals", intervals, [i], min, max);
    logger.intervals("remainingIntervals", remainingIntervals, [], min, max);
    logger.comment = "Iterate through the intervals"; // Set comment before breakpoint
    logger.breakpoint(3);
    if (currentStart < lastEnd) {
      // Increment removal count if there is an overlap
      removalCount++;
      logger.simple({ removalCount });
      logger.comment = "Log overlapping case"; // Set comment before breakpoint
      logger.breakpoint(4);
    } else {
      // Update the end point and record the interval
      lastEnd = currentEnd;
      remainingIntervals.push(intervals[i]);
      logger.comment = "Update non-overlapping intervals"; // Set comment before breakpoint
      logger.breakpoint(5);
    }
  }
const result = removalCount
  logger.intervals("intervals", intervals, [], min, max);
  logger.intervals("remainingIntervals", remainingIntervals, [], min, max);
  logger.comment = "Final log after all calculations"; // Set comment before breakpoint
  logger.simple({ result });
  logger.breakpoint(6);

  return logger.getSteps(); // Return steps from the logger
}

// Removed EraseOverlapIntervalsInput interface, code, title, getInput, tested flag, Problem export
