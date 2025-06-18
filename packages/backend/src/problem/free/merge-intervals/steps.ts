import _ = require("lodash");
import { StepLoggerV2 } from "algo-lens-core/src/StepLoggerV2"; // Import StepLoggerV2
import { getIntervalBounds } from "algo-lens-core/src/utils"; // Import getIntervalBounds
import { LabeledInterval, ProblemState } from "algo-lens-core/src/types";

// Removed ProblemState, Variable, asIntervals
import { MergeIntervalsInput } from "./types"; // Import MergeIntervalsInput

export function generateSteps(intervals: number[][]): ProblemState[] {
  // Renamed and Exported, Return type inferred
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2

  let result: number[][] = [];
  // Handle empty interval case FIRST
  if (!intervals || intervals.length === 0) {
    // For empty input, bounds are irrelevant, but we need some values for logging.
    // Let's use 0, 0 or handle as appropriate for the logger if it supports undefined bounds.
    // Assuming the logger needs numbers, we'll pass 0, 0 for the empty case.
    l.intervals("intervals", [], [], 0, 0);
    l.intervalsV2({
      label: "merged",
      arr: result.map((x) => ({ interval: x })),
      highlight: [],
      min: 0,
      max: 0,
    });
    l.breakpoint(6); // Directly to final state
    return l.getSteps();
  }

  // Calculate bounds only if intervals is not empty
  const { min, max } = l.getIntervalBounds(intervals); // Use utility function

  l.groupOptions.set("bounds", { min, max });
  // Log initial state (before sort)
  l.intervals(
    "intervals",
    intervals.map((arr) => [...arr]),
    [],
    min, // Use calculated min
    max // Use calculated max
  ); // Log copy before sort
  l.intervalsV2({ label: "merged", arr: [], highlight: [], min, max });
  l.comment =
    "Record the initial state of the intervals before sorting. Sorting is necessary to efficiently merge overlapping intervals by processing them in order of their start times.";
  l.breakpoint(1);

  // Sort the intervals based on the start time
  intervals.sort((a, b) => a[0] - b[0]);

  // Log state after sort
  l.intervals("intervals", intervals, [], min, max);
  l.intervalsV2({ label: "merged", arr: [], highlight: [], min, max });
  l.breakpoint(2);

  // Initialize the variable for merged intervals using the correct variable name 'merged'
  const merged: number[][] = []; // Use 'merged' as variable name based on variables.ts
  merged.push([...intervals[0]]); // Push a copy to avoid mutation issues if original interval obj is reused

  // Log state after adding the first interval
  l.intervals("intervals", intervals, [0], min, max); // Highlight first interval
  l.intervalsV2({
    label: "merged",
    arr: merged.map((i) => ({ interval: i })),
    highlight: [0],
    min,
    max,
  }); // Highlight the newly added interval
  l.comment = `Intervals sorted. Add first interval to merged.`;
  l.breakpoint(2.5);

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i]; // Use variable name from variables.ts
    const lastMerged = merged[merged.length - 1]; // Use variable name from variables.ts

    // Log state at the beginning of the loop iteration (before check)
    // Corrected l.simple call to match signature: simple(value: Record&lt;string, any&gt;)
    l.intervalsV2({
      label: "state",
      arr: [
        { interval: currentInterval, label: "Current" },
        { interval: lastMerged, label: "Last Merged" },
        ...merged.map((int, idx) => ({
          interval: int,
          label: `Merged ${idx}`,
        })),
      ],
      highlight: [0, 1],
      min,
      max,
    });
    l.intervals("intervals", intervals, [i], min, max); // Highlight current interval being checked
    l.comment = `Compare current interval with last merged.`;
    l.breakpoint(3);

    const currentStart = currentInterval[0];
    const currentEnd = currentInterval[1];
    const lastEnd = lastMerged[1];

    l.group("bounds", {
      "current start": currentStart,
      "last end": lastEnd,
      "current end": currentEnd,
    });
    l.comment =
      "Current interval's start, last merged interval's end, and current interval's end are grouped for comparison.";

    if (currentStart <= lastEnd) {
      // Merge: Update the end of the last interval in 'merged'
      lastMerged[1] = Math.max(lastEnd, currentEnd);

      // Log state after merging
      // Corrected l.simple call to match signature: simple(value: Record&lt;string, any&gt;)
      l.intervalsV2({
        label: "state",
        arr: [
          { interval: currentInterval, label: "Current" },
          { interval: lastMerged, label: "Last Merged" },
          ...merged.map((int, idx) => ({
            interval: int,
            label: `Merged ${idx}`,
          })),
        ],
        highlight: [1],
        min,
        max,
      }); // Highlight updated merged interval and show previous end
      l.intervals("intervals", intervals, [i], min, max);
      l.comment = `Overlap found. Update last merged interval.`;
      l.breakpoint(4);
    } else {
      // No overlap: Add the current interval to 'merged'
      merged.push([...currentInterval]); // Push a copy
      l.intervalsV2({
        label: "merged",
        arr: merged.map((x) => ({ interval: x })),
        highlight: [],
        min,
        max,
      });

      // Log state after adding a new interval
      // Corrected l.simple call to match signature: simple(value: Record&lt;string, any&gt;)
      l.intervalsV2({
        label: "state",
        arr: [
          { interval: currentInterval, label: "Current" },
          { interval: lastMerged, label: "Last Merged" },
          ...merged.map((int, idx) => ({
            interval: int,
            label: `Merged ${idx}`,
          })),
        ],
        highlight: [0], // Highlight current interval (which was added)
        min,
        max,
      }); // Highlight the newly added interval
      l.intervals("intervals", intervals, [i], min, max);
      l.comment = `No overlap. Add current interval to merged.`;
      l.breakpoint(5);
    }
    // Reset loop specific variables? Optional.
    // l.simple("i", undefined, { group: "loop" });
    // l.intervals("currentInterval", [], undefined, { group: "loop" });
    // l.intervals("lastMerged", [], undefined, { group: "loop" });
  }

  // Log final state
  l.intervals("intervals", intervals, [], min, max);
  result = merged;
  l.intervalsV2({
    label: "result",
    arr: result.map((i) => ({ interval: i })),
    highlight: [],
    min,
    max,
  }); // Changed "merged" to "result"
  l.comment =
    "All intervals have been processed. The 'merged' list now contains the final set of non-overlapping intervals that cover all the original intervals.";
  l.breakpoint(6);

  return l.getSteps(); // Return the collected steps
}

// Removed MergeIntervalsInput interface, code, title, getInput, Problem export comment seems outdated, MergeIntervalsInput is imported.
