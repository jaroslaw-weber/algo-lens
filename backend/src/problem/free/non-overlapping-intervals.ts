import { IntervalVariable, Problem, ProblemState, Variable } from "../core/types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
  asIntervals,
  getIntervalBounds,
} from "../core/utils";

interface EraseOverlapIntervalsInput {
  intervals: number[][];
}

export function eraseOverlapIntervals(
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

  log(6); //#6 Final log after all calculations

  return steps;
}

const code = `function eraseOverlapIntervals(intervals: number[][]): number {
  //#1 Sort intervals by their end points
  intervals.sort((a, b) => a[1] - b[1]);
  let lastEnd = Number.MIN_SAFE_INTEGER;
  let removalCount = 0;

  //#2 Iterate through the intervals
  for (let i = 0; i < intervals.length; i++) {
    const currentStart = intervals[i][0];

    //#3 Check for overlap
    if (currentStart < lastEnd) {
      //#4 Increment removal count on overlap
      removalCount++;
    } else {
      //#5 Update lastEnd if no overlap
      lastEnd = intervals[i][1];
    }
  }

  //#6 Return the count of removed intervals
  return removalCount;
}`;


const title = "Non-overlapping Intervals";
const getInput = () => ({
  intervals: [
    [17, 20],
    [2, 6],
    [8, 10],
    [12, 15],
    [5, 9],
    [1, 3],
    [14, 18],
    [19, 22],
  ],
});

export const eraseOverlapIntervalsProblem: Problem<
  EraseOverlapIntervalsInput,
  ProblemState
> = {
  title,
  code,
  getInput,
  func: eraseOverlapIntervals,
  id: "non-overlapping-intervals",
  tested:true,
  tags: ["interval"]
};
