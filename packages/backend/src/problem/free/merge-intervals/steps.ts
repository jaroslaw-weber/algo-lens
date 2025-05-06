import _ = require("lodash");
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
// Removed ProblemState, Variable, asIntervals, getIntervalBounds
import { MergeIntervalsInput } from "./types"; // Import MergeIntervalsInput

export function generateSteps(p: MergeIntervalsInput) {
  // Renamed and Exported, Return type inferred
  const { intervals } = p;
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2

  const min: number = _.min(intervals.map((arr) => arr[0]))!; // Get minimum start time
  const max: number = _.max(intervals.map((arr) => arr[1]))!; // Get maximum end time

  // Handle empty or single interval case
  if (!intervals || intervals.length === 0) {
    l.intervals("intervals", [], [], min, max);
    l.intervals("merged", [], [], min, max);
    l.breakpoint(6); // Directly to final state
    return l.getSteps();
  }

  // Log initial state (before sort)
  l.intervals(
    "intervals",
    intervals.map((arr) => [...arr]),
    [],
    min,
    max
  ); // Log copy before sort
  l.intervals("merged", [], [], min, max);
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
  l.breakpoint(2); // Maybe a new breakpoint 2.5 or adjust existing ones? Let's reuse 2 for now or add a specific one later if needed.

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
  l.simple({ i: undefined }); // Indicate loop finished

  // Log final state
  l.intervals("intervals", intervals, [], min, max);
  l.intervals("result", merged, [], min, max); // Changed "merged" to "result"
  l.breakpoint(6);

  return l.getSteps(); // Return the collected steps
}

// Removed MergeIntervalsInput interface, code, title, getInput, Problem export comment seems outdated, MergeIntervalsInput is imported.
