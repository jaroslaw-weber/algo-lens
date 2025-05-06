import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Adjusted path
import { getIntervalBounds } from "../../core/utils"; // Import the utility function
import { InsertIntervalInput, Interval } from "./types";
import { groups } from "./groups"; // Import groups
import _ = require("lodash");

export function generateSteps(
  intervals: Interval[],
  newInterval: Interval
): ProblemState[] {
  const l = new StepLoggerV2();

  const allintervals = [...intervals, newInterval];
  const { min: minValue, max: maxValue } = getIntervalBounds(allintervals); // Use the utility function

  let result: Interval[] = [];
  let i = 0;

  const inputGroup = groups.find((g) => g.name === "input")!.name;
  const resultArrayGroup = groups.find((g) => g.name === "result_array")!.name;
  const loopMergingGroup = groups.find((g) => g.name === "loop_merging")!.name;

  // Log initial state (Breakpoint #1 in code.ts corresponds to this)
  l.intervals("intervals", intervals, [], minValue, maxValue);
  l.intervals("newInterval", [newInterval], [], minValue, maxValue);
  l.intervals("result", result, [], minValue, maxValue);
  l.simple({ i });
  l.breakpoint(1, "Initial state before processing intervals."); // Matches //#1

  // Loop 1: Add intervals before newInterval
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    // No breakpoint inside this loop
    result.push(intervals[i]);
    i++;
  }

  // Log state after Loop 1 (Breakpoint #2)
  l.intervals("intervals", intervals, [], minValue, maxValue);
  l.intervals("newInterval", [newInterval], [], minValue, maxValue);
  l.intervals("result", result, [], minValue, maxValue);
  l.simple({ i });
  l.breakpoint(
    2,
    "Finished adding intervals that end before newInterval starts."
  ); // Matches //#2

  // Loop 2: Merge overlapping intervals
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    // No breakpoint inside this loop
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
    i++;
  }

  // Log state after Loop 2 (Breakpoint #3)
  l.intervals("intervals", intervals, [], minValue, maxValue);
  l.intervals("newInterval", [newInterval], [], minValue, maxValue); // Show potentially merged newInterval
  l.intervals("result", result, [], minValue, maxValue);
  l.simple({ i });
  l.breakpoint(3, "Finished merging overlapping intervals."); // Matches //#3

  // Log state before inserting merged/original newInterval (Breakpoint #4)
  l.intervals("intervals", intervals, [], minValue, maxValue);
  l.intervals("newInterval", [newInterval], [], minValue, maxValue);
  l.intervals("result", result, [], minValue, maxValue);
  l.simple({ i });
  l.breakpoint(
    4,
    `Ready to insert the merged/original newInterval [${newInterval.join(
      ", "
    )}].`
  ); // Matches //#4

  result.push(newInterval);

  // Loop 3: Add remaining intervals
  while (i < intervals.length) {
    // No breakpoint inside this loop
    result.push(intervals[i]);
    i++;
  }

  // Log state after Loop 3 (Breakpoint #5)
  l.intervals("intervals", intervals, [], minValue, maxValue);
  l.intervals("newInterval", [newInterval], [], minValue, maxValue);
  l.intervals("result", result, [], minValue, maxValue); // Result includes newInterval and potentially remaining intervals
  l.simple({ i });
  l.breakpoint(5, "Finished adding remaining intervals."); // Matches //#5

  // Final state log (Breakpoint #6)
  l.intervals("intervals", intervals, [], minValue, maxValue);
  l.intervals("newInterval", [newInterval], [], minValue, maxValue);
  l.intervals("result", result, [], minValue, maxValue); // Final result array
  l.simple({ i });
  l.breakpoint(6, "Finished processing all intervals. Returning final result."); // Matches //#6

  return l.getSteps();
}
