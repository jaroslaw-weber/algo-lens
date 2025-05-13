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
  logger.comment = "Initialize the removal count to 0. This variable will track the minimum number of intervals to remove to make the rest non-overlapping. Also, prepare a list to store the non-overlapping intervals."; // Set comment before breakpoint
  logger.breakpoint(1);

  intervals.sort((a, b) => a[1] - b[1]); //#2 Sort the intervals by end points
  logger.comment = "Sort the intervals based on their end points. Sorting by end points is a greedy approach that helps in selecting the maximum number of non-overlapping intervals efficiently."; // Set comment before breakpoint
  logger.breakpoint(2);

  let lastEnd = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < intervals.length; i++) {
    const currentStart = intervals[i][0];
    const currentEnd = intervals[i][1];
    logger.intervals("intervals", intervals, [i], min, max);
    logger.intervals("remainingIntervals", remainingIntervals, [], min, max);
    logger.comment = `Iterate through the sorted intervals. For the current interval [${currentStart}, ${currentEnd}], compare its start time (${currentStart}) with the end time of the last selected non-overlapping interval (${lastEnd}).`; // Set comment before breakpoint
    logger.breakpoint(3);
    if (currentStart < lastEnd) {
      // Increment removal count if there is an overlap
      removalCount++;
      logger.simple({ removalCount });
      logger.comment = `An overlap is detected because the start of the current interval (${currentStart}) is less than the end of the last selected non-overlapping interval (${lastEnd}). This means the current interval overlaps with the previous one, so we must remove it to ensure non-overlapping intervals. Increment the removal count to ${removalCount}.`; // Set comment before breakpoint
      logger.breakpoint(4);
    } else {
      // Update the end point and record the interval
      lastEnd = currentEnd;
      remainingIntervals.push(intervals[i]);
      logger.comment = `No overlap is detected because the start of the current interval (${currentStart}) is greater than or equal to the end of the last selected non-overlapping interval (${lastEnd}). This interval does not overlap with the previous non-overlapping intervals, so we keep it and update the end time of the last selected non-overlapping interval to the end of the current interval (${currentEnd}).`; // Set comment before breakpoint
      logger.breakpoint(5);
    }
  }
const result = removalCount
  logger.intervals("intervals", intervals, [], min, max);
  logger.intervals("remainingIntervals", remainingIntervals, [], min, max);
  logger.comment = `All intervals have been processed. The minimum number of intervals to remove to make the remaining intervals non-overlapping is ${result}.`; // Set comment before breakpoint
  logger.simple({ result });
  logger.breakpoint(6);

  return logger.getSteps(); // Return steps from the logger
}

// Removed EraseOverlapIntervalsInput interface, code, title, getInput, tested flag, Problem export
