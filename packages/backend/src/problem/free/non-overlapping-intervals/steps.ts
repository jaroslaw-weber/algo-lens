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
  const logger = new StepLoggerV2(); // Instantiate StepLoggerV2

  let removalCount = 0; //#1 Initialize removal count
  const remainingIntervals: number[][] = [];

  // Define variable scopes and types for the logger
  const { min, max } = getIntervalBounds(intervals);


  // Initial state log before the loop starts
  logger.array2d("intervals", intervals); // Assuming intervals is number[][]
  logger.array2d("remainingIntervals", remainingIntervals); // Assuming remainingIntervals is number[][]
  logger.simple({ removalCount });
  logger.breakpoint(1, "Log initial state"); // Added description

  intervals.sort((a, b) => a[1] - b[1]); //#2 Sort the intervals by end points
  logger.array2d("intervals", intervals);
  logger.array2d("remainingIntervals", remainingIntervals);
  logger.simple({ removalCount });
  logger.breakpoint(2, "Log after sort"); // Added description

  let lastEnd = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < intervals.length; i++) {
    const currentStart = intervals[i][0];
    const currentEnd = intervals[i][1];
    logger.array2d("intervals", intervals);
    logger.array2d("remainingIntervals", remainingIntervals);
    logger.simple({ removalCount });
    logger.simple({ i }); // Log index i
    logger.breakpoint(3, "Iterate through the intervals"); // Added description
    if (currentStart < lastEnd) {
      // Increment removal count if there is an overlap
      removalCount++;
      logger.array2d("intervals", intervals);
      logger.array2d("remainingIntervals", remainingIntervals);
      logger.simple({ removalCount });
      logger.simple({ i });
      logger.breakpoint(4, "Log overlapping case"); // Added description
    } else {
      // Update the end point and record the interval
      lastEnd = currentEnd;
      remainingIntervals.push(intervals[i]);
      logger.array2d("intervals", intervals);
      logger.array2d("remainingIntervals", remainingIntervals);
      logger.simple({ removalCount });
      logger.simple({ i });
      logger.breakpoint(5, "Update non-overlapping intervals"); // Added description
    }
  }

  logger.array2d("intervals", intervals);
  logger.array2d("remainingIntervals", remainingIntervals);
  logger.simple({ removalCount });
  logger.breakpoint(6, "Final log after all calculations"); // Added description

  // Log the final removal count as 'result'
  logger.simple({ result: removalCount });
  return logger.getSteps(); // Return steps from the logger
}

// Removed EraseOverlapIntervalsInput interface, code, title, getInput, tested flag, Problem export
