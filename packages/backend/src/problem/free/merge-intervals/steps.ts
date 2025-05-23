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
  l.comment = "Record the initial state of the intervals before sorting. Sorting is necessary to efficiently merge overlapping intervals by processing them in order of their start times.";
  l.breakpoint(1);

  // Sort the intervals based on the start time
  intervals.sort((a, b) => a[0] - b[0]);

  // Log state after sort
  l.intervals("intervals", intervals, [], min, max);
  l.intervals("merged", [], [], min, max);
  l.breakpoint(2);

  // Initialize the variable for merged intervals using the correct variable name 'merged'
  const merged: number[][] = []; // Use 'merged' as variable name based on variables.ts
  merged.push([...intervals[0]]); // Push a copy to avoid mutation issues if original interval obj is reused

  // Log state after adding the first interval
  l.intervals("intervals", intervals, [0], min, max); // Highlight first interval
  l.intervals("merged", merged, [0], min, max); // Highlight the newly added interval
  l.comment = `The intervals have been sorted by their start times. The first interval, [${intervals[0].join(", ")}], is added to the 'merged' list because it is the starting point for comparison and merging.`;
  l.breakpoint(2); // Maybe a new breakpoint 2.5 or adjust existing ones? Let's reuse 2 for now or add a specific one later if needed.

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i]; // Use variable name from variables.ts
    const lastMerged = merged[merged.length - 1]; // Use variable name from variables.ts

    // Log state at the beginning of the loop iteration (before check)
    // Corrected l.simple call to match signature: simple(value: Record&lt;string, any&gt;)
    l.intervals("currentInterval", [currentInterval], [], min, max);
    l.intervals("lastMerged", [lastMerged], [], min, max);
    l.intervals("intervals", intervals, [i], min, max); // Highlight current interval being checked
    l.intervals("merged", merged, [merged.length - 1], min, max); // Highlight the last merged interval
    l.comment = `Compare the current interval [${currentInterval.join( "," )}] with the last interval added to the 'merged' list [${lastMerged.join(",")}]. This comparison determines if the current interval overlaps with the last merged interval.`;
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
      l.intervals("currentInterval", [currentInterval], [], min, max);
      l.intervals("lastMerged", [lastMerged], [], min, max); // Indicate update
      l.intervals("intervals", intervals, [i], min, max);
      l.intervals("merged", merged, [merged.length - 1], min, max); // Highlight updated merged interval and show previous end
      l.comment = `An overlap is found because the start of the current interval (${currentInterval[0]}) is less than or equal to the end of the last merged interval (${lastMerged[1]}). The end of the last merged interval is updated to the maximum of its current end and the end of the current interval to encompass both intervals. Updated lastMerged: [${lastMerged.join( "," )}].`;
      l.breakpoint(4);
    } else {
      // No overlap: Add the current interval to 'merged'
      merged.push([...currentInterval]); // Push a copy

      // Log state after adding a new interval
      // Corrected l.simple call to match signature: simple(value: Record&lt;string, any&gt;)
      l.intervals("lastMerged", [lastMerged], [], min, max); // Show the one before the new one
      l.intervals("intervals", intervals, [i], min, max);
      l.intervals("merged", merged, [merged.length - 1], min, max); // Highlight the newly added interval
      l.comment = `No overlap is found because the start of the current interval (${currentInterval[0]}) is greater than the end of the last merged interval (${lastMerged[1]}). The current interval [${currentInterval.join( "," )}] is added as a new, separate interval to the 'merged' list.`;
      l.breakpoint(5);
    }
    // Reset loop specific variables? Optional.
    // l.simple("i", undefined, { group: "loop" });
    // l.intervals("currentInterval", [], undefined, { group: "loop" });
    // l.intervals("lastMerged", [], undefined, { group: "loop" });
  }

  // Log final state
  l.intervals("intervals", intervals, [], min, max);
  l.intervals("result", merged, [], min, max); // Changed "merged" to "result"
  l.comment = "All intervals have been processed. The 'merged' list now contains the final set of non-overlapping intervals that cover all the original intervals.";
  l.breakpoint(6);

  return l.getSteps(); // Return the collected steps
}

// Removed MergeIntervalsInput interface, code, title, getInput, Problem export comment seems outdated, MergeIntervalsInput is imported.
