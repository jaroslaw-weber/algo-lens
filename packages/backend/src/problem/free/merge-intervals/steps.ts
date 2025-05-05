import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Import StepLoggerV2
import { getIntervalBounds } from "../../core/utils"; // Import getIntervalBounds
import { MergeIntervalsInput } from "./types"; // Import MergeIntervalsInput

export function generateSteps(p: MergeIntervalsInput) { // Renamed and Exported, Return type inferred
  const { intervals } = p;
  const l = new StepLoggerV2(); // Instantiate StepLoggerV2

  // Handle empty or single interval case
  if (!intervals || intervals.length === 0) {
      const { min: intervalsMin, max: intervalsMax } = getIntervalBounds([]);
      l.intervals("intervals", [], undefined, intervalsMin, intervalsMax);
      const { min: mergedMin, max: mergedMax } = getIntervalBounds([]);
      l.intervals("merged", [], undefined, mergedMin, mergedMax);
      l.breakpoint(6); // Directly to final state
      return l.getSteps();
  }

  // Log initial state (before sort)
  const initialIntervals = intervals.map(arr => [...arr]);
  const { min: initialIntervalsMin, max: initialIntervalsMax } = getIntervalBounds(initialIntervals);
  l.intervals("intervals", initialIntervals, undefined, initialIntervalsMin, initialIntervalsMax); // Log copy before sort
  const { min: initialMergedMin, max: initialMergedMax } = getIntervalBounds([]);
  l.intervals("merged", [], undefined, initialMergedMin, initialMergedMax);
  l.breakpoint(1);

  // Sort the intervals based on the start time
  intervals.sort((a, b) => a[0] - b[0]);

  // Log state after sort
  const { min: sortedIntervalsMin, max: sortedIntervalsMax } = getIntervalBounds(intervals);
  l.intervals("intervals", intervals, undefined, sortedIntervalsMin, sortedIntervalsMax);
  const { min: sortedMergedMin, max: sortedMergedMax } = getIntervalBounds([]);
  l.intervals("merged", [], undefined, sortedMergedMin, sortedMergedMax);
  l.breakpoint(2);

  // Initialize the variable for merged intervals using the correct variable name 'merged'
  const merged: number[][] = []; // Use 'merged' as variable name based on variables.ts
  merged.push([...intervals[0]]); // Push a copy to avoid mutation issues if original interval obj is reused

  // Log state after adding the first interval
  const { min: firstIntervalsMin, max: firstIntervalsMax } = getIntervalBounds(intervals);
  l.intervals("intervals", intervals, [0], firstIntervalsMin, firstIntervalsMax); // Highlight first interval
  const { min: firstMergedMin, max: firstMergedMax } = getIntervalBounds(merged);
  l.intervals("merged", merged, [0], firstMergedMin, firstMergedMax); // Highlight the newly added interval
  l.breakpoint(2); // Maybe a new breakpoint 2.5 or adjust existing ones? Let's reuse 2 for now or add a specific one later if needed.

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i]; // Use variable name from variables.ts
    const lastMerged = merged[merged.length - 1]; // Use variable name from variables.ts

    // Log state at the beginning of the loop iteration (before check)
    l.simple({ i });
    const { min: currentIntervalMin, max: currentIntervalMax } = getIntervalBounds([currentInterval]);
    l.intervals("currentInterval", [currentInterval], undefined, currentIntervalMin, currentIntervalMax);
    const { min: lastMergedMin, max: lastMergedMax } = getIntervalBounds([lastMerged]);
    l.intervals("lastMerged", [lastMerged], undefined, lastMergedMin, lastMergedMax);
    const { min: loopIntervalsMin, max: loopIntervalsMax } = getIntervalBounds(intervals);
    l.intervals("intervals", intervals, [i], loopIntervalsMin, loopIntervalsMax); // Highlight current interval being checked
    const { min: loopMergedMin, max: loopMergedMax } = getIntervalBounds(merged);
    l.intervals("merged", merged, [merged.length - 1], loopMergedMin, loopMergedMax); // Highlight the last merged interval
    l.breakpoint(3);

    const currentStart = currentInterval[0];
    const currentEnd = currentInterval[1];
    const lastEnd = lastMerged[1];

    if (currentStart <= lastEnd) {
      // Merge: Update the end of the last interval in 'merged'
      const previousLastMergedEnd = lastMerged[1]; // Store previous value for logging
      lastMerged[1] = Math.max(lastEnd, currentEnd);

      // Log state after merging
      l.simple({ i });
      const { min: currentIntervalMinMerge, max: currentIntervalMaxMerge } = getIntervalBounds([currentInterval]);
      l.intervals("currentInterval", [currentInterval], undefined, currentIntervalMinMerge, currentIntervalMaxMerge);
      const { min: lastMergedMinMerge, max: lastMergedMaxMerge } = getIntervalBounds([lastMerged]);
      l.intervals("lastMerged", [lastMerged], undefined, lastMergedMinMerge, lastMergedMaxMerge); // Indicate update
      const { min: intervalsMinMerge, max: intervalsMaxMerge } = getIntervalBounds(intervals);
      l.intervals("intervals", intervals, [i], intervalsMinMerge, intervalsMaxMerge);
      const { min: mergedMinMerge, max: mergedMaxMerge } = getIntervalBounds(merged);
      l.intervals("merged", merged, [merged.length - 1], mergedMinMerge, mergedMaxMerge); // Highlight updated merged interval and show previous end
      l.breakpoint(4);
    } else {
      // No overlap: Add the current interval to 'merged'
      merged.push([...currentInterval]); // Push a copy

      // Log state after adding a new interval
      l.simple({ i });
      const { min: currentIntervalMinAdd, max: currentIntervalMaxAdd } = getIntervalBounds([currentInterval]);
      l.intervals("currentInterval", [currentInterval], undefined, currentIntervalMinAdd, currentIntervalMaxAdd);
      const { min: lastMergedMinAdd, max: lastMergedMaxAdd } = getIntervalBounds([lastMerged]);
      l.intervals("lastMerged", [lastMerged], undefined, lastMergedMinAdd, lastMergedMaxAdd); // Show the one before the new one
      const { min: intervalsMinAdd, max: intervalsMaxAdd } = getIntervalBounds(intervals);
      l.intervals("intervals", intervals, [i], intervalsMinAdd, intervalsMaxAdd);
      const { min: mergedMinAdd, max: mergedMaxAdd } = getIntervalBounds(merged);
      l.intervals("merged", merged, [merged.length - 1], mergedMinAdd, mergedMaxAdd); // Highlight the newly added interval
      l.breakpoint(5);
    }
     // Reset loop specific variables? Optional.
     // l.simple({ i: undefined });
     // const { min: resetCurrentMin, max: resetCurrentMax } = getIntervalBounds([]);
     // l.intervals("currentInterval", [], undefined, resetCurrentMin, resetCurrentMax);
     // const { min: resetLastMin, max: resetLastMax } = getIntervalBounds([]);
     // l.intervals("lastMerged", [], undefined, resetLastMin, resetLastMax);
  }
   l.simple({ i: undefined }); // Indicate loop finished

  // Log final state
  const { min: finalIntervalsMin, max: finalIntervalsMax } = getIntervalBounds(intervals);
  l.intervals("intervals", intervals, undefined, finalIntervalsMin, finalIntervalsMax);
  const { min: finalResultMin, max: finalResultMax } = getIntervalBounds(merged);
  l.intervals("result", merged, undefined, finalResultMin, finalResultMax); // Changed "merged" to "result"
  l.breakpoint(6);

  return l.getSteps(); // Return the collected steps
}

// Removed MergeIntervalsInput interface, code, title, getInput, Problem export comment seems outdated, MergeIntervalsInput is imported.
