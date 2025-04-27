import { ProblemStep, StepLogger } from "algo-lens-core";
import { asIntervals, asSimpleValue, getIntervalBounds } from "algo-lens-core/utils"; // Assuming utils location
import { NonOverlappingIntervalsParams } from "./types";
import { codeRaw } from "./code";

export const generateSteps = (
  params: NonOverlappingIntervalsParams
): ProblemStep[] => {
  const { intervals: initialIntervals } = params;
  // Clone intervals to avoid modifying the input object during sort
  const intervals = initialIntervals.map(interval => [...interval]);
  const logger = new StepLogger(codeRaw);

  let removalCount = 0;
  const remainingIntervals: number[][] = [];
  const { min, max } = getIntervalBounds(intervals); // Calculate bounds for visualization

  // Log initial state
  logger.log({
    breakpoint: 1,
    state: {
      intervals: asIntervals(intervals, [], min, max),
      remainingIntervals: asIntervals(remainingIntervals, [], min, max),
      removalCount: asSimpleValue(removalCount),
    },
  });

  if (intervals.length === 0) {
    // Log final state for empty input
    logger.log({
      breakpoint: 6, // Corresponds to the final state breakpoint
      state: {
        intervals: asIntervals(intervals, [], min, max),
        remainingIntervals: asIntervals(remainingIntervals, [], min, max),
        removalCount: asSimpleValue(removalCount),
      },
    });
    return logger.getSteps();
  }

  intervals.sort((a, b) => a[1] - b[1]);

  // Log state after sorting
  logger.log({
    breakpoint: 2,
    state: {
      intervals: asIntervals(intervals, [], min, max), // Show sorted intervals
      remainingIntervals: asIntervals(remainingIntervals, [], min, max),
      removalCount: asSimpleValue(removalCount),
    },
  });

  let lastEnd = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < intervals.length; i++) {
    const currentStart = intervals[i][0];
    const currentEnd = intervals[i][1];

    // Log state at the beginning of the loop iteration
    logger.log({
      breakpoint: 3,
      state: {
        intervals: asIntervals(intervals, [i], min, max), // Highlight current interval
        remainingIntervals: asIntervals(remainingIntervals, [], min, max),
        removalCount: asSimpleValue(removalCount),
        lastEnd: asSimpleValue(lastEnd),
        i: asSimpleValue(i),
      },
    });

    if (currentStart < lastEnd) {
      removalCount++;
      // Log state when overlap is detected
      logger.log({
        breakpoint: 4,
        state: {
          intervals: asIntervals(intervals, [i], min, max), // Highlight overlapping interval
          remainingIntervals: asIntervals(remainingIntervals, [], min, max),
          removalCount: asSimpleValue(removalCount), // Updated count
          lastEnd: asSimpleValue(lastEnd),
          i: asSimpleValue(i),
        },
      });
    } else {
      lastEnd = currentEnd;
      remainingIntervals.push(intervals[i]);
      // Log state when no overlap is found
      logger.log({
        breakpoint: 5,
        state: {
          intervals: asIntervals(intervals, [i], min, max),
          remainingIntervals: asIntervals(remainingIntervals, [], min, max), // Updated remaining
          removalCount: asSimpleValue(removalCount),
          lastEnd: asSimpleValue(lastEnd), // Updated lastEnd
          i: asSimpleValue(i),
        },
      });
    }
  }

  // Log final state after the loop
  logger.log({
    breakpoint: 6,
    state: {
      intervals: asIntervals(intervals, [], min, max), // Final sorted intervals
      remainingIntervals: asIntervals(remainingIntervals, [], min, max), // Final non-overlapping set
      removalCount: asSimpleValue(removalCount), // Final count
      lastEnd: asSimpleValue(lastEnd),
    },
  });

  return logger.getSteps();
};
