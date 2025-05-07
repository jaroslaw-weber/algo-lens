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
  l.breakpoint(1, "Initial state before processing intervals.");

  // Loop 1: Add intervals before newInterval
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    const currentInterval = intervals[i];
    result.push(currentInterval);
    i++;

    // Log state inside loop 1
    l.intervals("intervals", intervals, [i - 1], minValue, maxValue); // Highlight the interval just added
    l.intervals("newInterval", [newInterval], [], minValue, maxValue);
    l.intervals("result", result, [], minValue, maxValue);
    l.simple({ i });
    l.intervals("currentInterval", [currentInterval], [], minValue, maxValue); // Log the interval just processed
    l.breakpoint( // Corresponds to #2 in code
      2,
      `Added interval [${currentInterval.join(
        ", "
      )}] to result because it ends before newInterval starts. State after addition:`
    );
  }

  // Log state before loop 2
  l.intervals("intervals", intervals, [], minValue, maxValue); // Show intervals before merge loop
  l.intervals("newInterval", [newInterval], [], minValue, maxValue); // Show newInterval before merge loop
  l.intervals("result", result, [], minValue, maxValue);
  l.simple({ i });
  l.breakpoint( // Corresponds to #3 in code
    3,
    "Starting merge phase. Checking for overlaps with newInterval."
  );

  // Loop 2: Merge overlapping intervals
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    const currentInterval = intervals[i];
    newInterval[0] = Math.min(currentInterval[0], newInterval[0]);
    newInterval[1] = Math.max(currentInterval[1], newInterval[1]);
    i++;

    // Log state during merge
    const message = `Merging interval [${currentInterval.join(
      ", "
    )}] into newInterval. Updated newInterval: [${newInterval.join(", ")}].`;
    l.intervals("intervals", intervals, [i - 1], minValue, maxValue); // Highlight the interval just merged
    l.intervals("newInterval", [newInterval], [], minValue, maxValue); // Show updated newInterval
    l.intervals("result", result, [], minValue, maxValue);
    l.simple({ i });
    l.intervals("currentInterval", [currentInterval], [], minValue, maxValue); // Log the interval just processed
    l.breakpoint(4, message); // Corresponds to #4 in code
  }

  // Log state before inserting merged interval
  l.intervals("intervals", intervals, [], minValue, maxValue);
  l.intervals("newInterval", [newInterval], [], minValue, maxValue);
  l.intervals("result", result, [], minValue, maxValue);
  l.simple({ i });
  l.breakpoint(5, "Finished merging. About to insert newInterval."); // Corresponds to #5 in code

  // Insert the merged newInterval
  result.push(newInterval);
  l.intervals("intervals", intervals, [], minValue, maxValue);
  l.intervals("newInterval", [newInterval], [], minValue, maxValue); // Show final merged/original newInterval
  l.intervals("result", result, [], minValue, maxValue); // Show result with newInterval added
  l.simple({ i });
   l.breakpoint( // Corresponds to #6 in code
     6,
     `Inserted the final merged/original newInterval [${newInterval.join(
      ", "
    )}].`
  );

  // Log state before loop 3
  l.intervals("intervals", intervals, [], minValue, maxValue); // Show intervals before loop
  l.intervals("newInterval", [newInterval], [], minValue, maxValue);
  l.intervals("result", result, [], minValue, maxValue);
  l.simple({ i });
   l.breakpoint( // Corresponds to #7 in code
     7,
    "Starting phase to add remaining intervals after newInterval."
  );

   // Loop 3: Add remaining intervals
  while (i < intervals.length) {
    const currentInterval = intervals[i];
    result.push(currentInterval);
    i++;

    // Log state adding remaining interval
    const message = `Adding remaining interval [${currentInterval.join(
      ", "
    )}] to result.`;
    l.intervals("intervals", intervals, [i - 1], minValue, maxValue); // Highlight the interval just added
    l.intervals("newInterval", [newInterval], [], minValue, maxValue);
    l.intervals("result", result, [], minValue, maxValue);
    l.simple({ i });
    l.intervals("currentInterval", [currentInterval], [], minValue, maxValue); // Log the interval just processed
     l.breakpoint(8, message); // Corresponds to #8 in code
  }

   // Final state log
  l.intervals("intervals", intervals, [], minValue, maxValue);
  l.intervals("newInterval", [newInterval], [], minValue, maxValue);
  l.intervals("result", result, [], minValue, maxValue); // Final result array
  l.simple({ i });
   l.breakpoint(9, "Finished processing all intervals. Returning final result."); // Corresponds to #9 in code

  return l.getSteps();
}
