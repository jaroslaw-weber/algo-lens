import _ = require("lodash");
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import { getIntervalBounds } from "../../core/utils"; // Import getIntervalBounds
// Removed ProblemState, Variable, asIntervals
import { MergeIntervalsInput } from "./types"; // Import MergeIntervalsInput

export function generateSteps(intervals: number[][]) {
  // Renamed and Exported, Return type inferred
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2

  // Handle empty interval case FIRST
  if (!intervals || intervals.length === 0) {
    // For empty input, bounds are irrelevant, but we need some values for logging.
    // Let's use 0, 0 or handle as appropriate for the logger if it supports undefined bounds.
    // Assuming the logger needs numbers, we'll pass 0, 0 for the empty case.
    l.intervals("intervals", [], [], 0, 0);
    l.intervals("merged", [], [], 0, 0);
    l.breakpoint(6); // Directly to final state
    return l.getSteps();
  }

  // Calculate bounds only if intervals is not empty
  const { min, max } = getIntervalBounds(intervals); // Use utility function
  // Log initial state (before sort)
  l.intervals(
    "intervals",
    intervals.map((arr) => [...arr]),
    [],
    min, // Use calculated min
    max // Use calculated max
  ); // Log copy before sort
  l.intervals("merged", [], [], min, max);
  // No breakpoint before sort

  // Sort the intervals based on the start time
  intervals.sort((a, b) => a[0] - b[0]);

  // Log state after sort (Breakpoint 1)
  l.intervals("intervals", intervals, [], min, max);
  l.intervals("merged", [], [], min, max);
  l.breakpoint(1, "Intervals sorted by start time."); // Matches //#1

  // Initialize the variable for merged intervals using the correct variable name 'merged'
  const merged: number[][] = []; // Use 'merged' as variable name based on variables.ts
  merged.push([...intervals[0]]); // Push a copy to avoid mutation issues if original interval obj is reused

  // Log state after adding the first interval (Breakpoint 2)
  l.intervals("intervals", intervals, [0], min, max); // Highlight first interval
  l.intervals("merged", merged, [0], min, max); // Highlight the newly added interval
  l.breakpoint(2, "Initialized merged with the first sorted interval."); // Matches //#2

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i]; // Use variable name from variables.ts
    const lastMerged = merged[merged.length - 1]; // Use variable name from variables.ts

    // Log state at the beginning of the loop iteration (before check)
    // Corrected l.simple call to match signature: simple(value: Record&lt;string, any&gt;)
    l.simple({ i: i });
    l.intervals("currentInterval", [currentInterval], [], min, max);
    l.intervals("lastMerged", [lastMerged], [], min, max);
    l.intervals("intervals", intervals, [i], min, max); // Highlight current interval being checked
    l.intervals("merged", merged, [merged.length - 1], min, max); // Highlight the last merged interval
    l.breakpoint(3);

    const currentStart = currentInterval[0];
    const currentEnd = currentInterval[1];
    const lastEnd = lastMerged[1];

    if (currentStart <= lastEnd) {
      // Merge: Update the end of the last interval in 'merged'
      const previousLastMergedEnd = lastMerged[1]; // Store previous value for logging
      lastMerged[1] = Math.max(lastEnd, currentEnd);

      // Log state after merging
      // Corrected l.simple call to match signature: simple(value: Record&lt;string, any&gt;)
      l.simple({ i: i });
      l.intervals("currentInterval", [currentInterval], [], min, max);
      l.intervals("lastMerged", [lastMerged], [], min, max); // Indicate update
      l.intervals("intervals", intervals, [i], min, max);
      l.intervals("merged", merged, [merged.length - 1], min, max); // Highlight updated merged interval and show previous end
      l.breakpoint(4);
    } else {
      // No overlap: Add the current interval to 'merged'
      merged.push([...currentInterval]); // Push a copy

      // Log state after adding a new interval
      // Corrected l.simple call to match signature: simple(value: Record&lt;string, any&gt;)
      l.simple({ i: i });
      l.intervals("lastMerged", [lastMerged], [], min, max); // Show the one before the new one
      l.intervals("intervals", intervals, [i], min, max);
      l.intervals("merged", merged, [merged.length - 1], min, max); // Highlight the newly added interval
      l.breakpoint(5);
    }
    // Reset loop specific variables? Optional.
    // l.simple("i", undefined, { group: "loop" });
    // l.intervals("currentInterval", [], undefined, { group: "loop" });
    // l.intervals("lastMerged", [], undefined, { group: "loop" });
  }
  // Corrected l.simple call to match signature: simple(value: Record&lt;string, any&gt;)
  l.hide("i"); // Optional: Hide loop counter after loop

  // Log final state (Breakpoint 6)
  l.intervals("intervals", intervals, [], min, max);
  l.intervals("merged", merged, [], min, max); // Log final merged array
  l.breakpoint(6, "Finished merging intervals."); // Matches //#6

  return l.getSteps(); // Return the collected steps
}

// Removed MergeIntervalsInput interface, code, title, getInput, Problem export comment seems outdated, MergeIntervalsInput is imported.
