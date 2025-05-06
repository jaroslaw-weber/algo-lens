import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
// Removed ProblemState, Variable, asIntervals, getIntervalBounds
import { MergeIntervalsInput } from "./types"; // Import MergeIntervalsInput

export function generateSteps(p: MergeIntervalsInput) { // Renamed and Exported, Return type inferred
  const { intervals } = p;
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2

  // Handle empty or single interval case
  if (!intervals || intervals.length === 0) {
      l.intervals("intervals", [], undefined, { group: "input" });
      l.intervals("merged", [], undefined, { group: "result" });
      l.breakpoint(6); // Directly to final state
      return l.getSteps();
  }

  // Log initial state (before sort)
  l.intervals("intervals", intervals.map(arr => [...arr]), undefined, { group: "input", label: "intervals (unsorted)" }); // Log copy before sort
  l.intervals("merged", [], undefined, { group: "result" });
  l.breakpoint(1);

  // Sort the intervals based on the start time
  intervals.sort((a, b) => a[0] - b[0]);

  // Log state after sort
  l.intervals("intervals", intervals, undefined, { group: "input", label: "intervals (sorted)" });
  l.intervals("merged", [], undefined, { group: "result" });
  l.breakpoint(2);

  // Initialize the variable for merged intervals using the correct variable name 'merged'
  const merged: number[][] = []; // Use 'merged' as variable name based on variables.ts
  merged.push([...intervals[0]]); // Push a copy to avoid mutation issues if original interval obj is reused

  // Log state after adding the first interval
  l.intervals("intervals", intervals, [0], { group: "input", label: "intervals (sorted)" }); // Highlight first interval
  l.intervals("merged", merged, [0], { group: "result" }); // Highlight the newly added interval
  l.breakpoint(2); // Maybe a new breakpoint 2.5 or adjust existing ones? Let's reuse 2 for now or add a specific one later if needed.

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i]; // Use variable name from variables.ts
    const lastMerged = merged[merged.length - 1]; // Use variable name from variables.ts

    // Log state at the beginning of the loop iteration (before check)
    l.simple("i", i, { group: "loop" });
    l.intervals("currentInterval", [currentInterval], undefined, { group: "loop" });
    l.intervals("lastMerged", [lastMerged], undefined, { group: "loop" });
    l.intervals("intervals", intervals, [i], { group: "input", label: "intervals (sorted)" }); // Highlight current interval being checked
    l.intervals("merged", merged, [merged.length - 1], { group: "result" }); // Highlight the last merged interval
    l.breakpoint(3);

    const currentStart = currentInterval[0];
    const currentEnd = currentInterval[1];
    const lastEnd = lastMerged[1];

    if (currentStart <= lastEnd) {
      // Merge: Update the end of the last interval in 'merged'
      const previousLastMergedEnd = lastMerged[1]; // Store previous value for logging
      lastMerged[1] = Math.max(lastEnd, currentEnd);

      // Log state after merging
      l.simple("i", i, { group: "loop" });
      l.intervals("currentInterval", [currentInterval], undefined, { group: "loop" });
      l.intervals("lastMerged", [lastMerged], undefined, { group: "loop", label: "lastMerged (updated)" }); // Indicate update
      l.intervals("intervals", intervals, [i], { group: "input", label: "intervals (sorted)" });
      l.intervals("merged", merged, [merged.length - 1], { group: "result", previousValue: [lastMerged[0], previousLastMergedEnd] }); // Highlight updated merged interval and show previous end
      l.breakpoint(4);
    } else {
      // No overlap: Add the current interval to 'merged'
      merged.push([...currentInterval]); // Push a copy

      // Log state after adding a new interval
      l.simple("i", i, { group: "loop" });
      l.intervals("currentInterval", [currentInterval], undefined, { group: "loop" });
      l.intervals("lastMerged", [lastMerged], undefined, { group: "loop", label: "lastMerged (previous)" }); // Show the one before the new one
      l.intervals("intervals", intervals, [i], { group: "input", label: "intervals (sorted)" });
      l.intervals("merged", merged, [merged.length - 1], { group: "result" }); // Highlight the newly added interval
      l.breakpoint(5);
    }
     // Reset loop specific variables? Optional.
     // l.simple("i", undefined, { group: "loop" });
     // l.intervals("currentInterval", [], undefined, { group: "loop" });
     // l.intervals("lastMerged", [], undefined, { group: "loop" });
  }
   l.simple("i", undefined, { group: "loop" }); // Indicate loop finished

  // Log final state
  l.intervals("intervals", intervals, undefined, { group: "input", label: "intervals (sorted)" });
  l.intervals("result", merged, undefined, { group: "result" }); // Changed "merged" to "result"
  l.breakpoint(6);

  return l.getSteps(); // Return the collected steps
}

// Removed MergeIntervalsInput interface, code, title, getInput, Problem export comment seems outdated, MergeIntervalsInput is imported.
