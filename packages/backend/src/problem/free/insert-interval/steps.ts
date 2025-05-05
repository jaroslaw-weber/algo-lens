import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Adjusted path
import { getIntervalBounds } from "../../core/utils"; // Import getIntervalBounds
import { InsertIntervalInput, Interval } from "./types";
import { groups } from "./groups"; // Import groups

export function generateSteps(
  intervals: Interval[],
  newInterval: Interval
): ProblemState[] {
  const l = new StepLoggerV2();
  
  let result: Interval[] = [];
  let i = 0;

  const inputGroup = groups.find((g) => g.name === "input")!.name;
  const resultArrayGroup = groups.find((g) => g.name === "result_array")!.name;
  const loopMergingGroup = groups.find((g) => g.name === "loop_merging")!.name;

  // Log initial state (Breakpoint #1 in code.ts corresponds to this)
  const { min: intervalsMinInit, max: intervalsMaxInit } = getIntervalBounds(intervals);
  l.intervals("intervals", intervals, [], intervalsMinInit, intervalsMaxInit);
  const { min: newIntervalMinInit, max: newIntervalMaxInit } = getIntervalBounds([newInterval]); // Wrap single interval
  l.intervals("newInterval", [newInterval], [], newIntervalMinInit, newIntervalMaxInit);
  const { min: resultMinInit, max: resultMaxInit } = getIntervalBounds(result);
  l.intervals("result", result, [], resultMinInit, resultMaxInit);
  l.simple({ i });
  l.breakpoint(1, "Initial state before processing intervals.");

  // Loop 1: Add intervals before newInterval (Breakpoint #2)
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    const currentInterval = intervals[i];
    result.push(currentInterval);
    i++;

    // Log state inside loop 1
    const { min: intervalsMinL1, max: intervalsMaxL1 } = getIntervalBounds(intervals);
    l.intervals("intervals", intervals, [i - 1], intervalsMinL1, intervalsMaxL1); // Highlight the interval just added
    const { min: newIntervalMinL1, max: newIntervalMaxL1 } = getIntervalBounds([newInterval]);
    l.intervals("newInterval", [newInterval], [], newIntervalMinL1, newIntervalMaxL1);
    const { min: resultMinL1, max: resultMaxL1 } = getIntervalBounds(result);
    l.intervals("result", result, [], resultMinL1, resultMaxL1);
    l.simple({ i });
    const { min: currentIntervalMinL1, max: currentIntervalMaxL1 } = getIntervalBounds([currentInterval]);
    l.intervals("currentInterval", [currentInterval], [], currentIntervalMinL1, currentIntervalMaxL1); // Log the interval just processed
    l.breakpoint(
      2,
      `Adding interval [${currentInterval.join(
        ", "
      )}] as it ends before newInterval starts.`
    );
  }

  // Loop 2: Merge overlapping intervals (Breakpoint #3)
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    const currentInterval = intervals[i];
    newInterval[0] = Math.min(currentInterval[0], newInterval[0]);
    newInterval[1] = Math.max(currentInterval[1], newInterval[1]);
    i++;

    // Log state inside loop 2
    const { min: intervalsMinL2, max: intervalsMaxL2 } = getIntervalBounds(intervals);
    l.intervals("intervals", intervals, [i - 1], intervalsMinL2, intervalsMaxL2); // Highlight the interval just merged
    const { min: newIntervalMinL2, max: newIntervalMaxL2 } = getIntervalBounds([newInterval]);
    l.intervals("newInterval", [newInterval], [], newIntervalMinL2, newIntervalMaxL2); // Show updated newInterval
    const { min: resultMinL2, max: resultMaxL2 } = getIntervalBounds(result);
    l.intervals("result", result, [], resultMinL2, resultMaxL2);
    l.simple({ i });
    const { min: currentIntervalMinL2, max: currentIntervalMaxL2 } = getIntervalBounds([currentInterval]);
    l.intervals("currentInterval", [currentInterval], [], currentIntervalMinL2, currentIntervalMaxL2); // Log the interval just processed
    l.breakpoint(
      3,
      `Merging interval [${currentInterval.join(
        ", "
      )}] into newInterval. Updated newInterval: [${newInterval.join(", ")}].`
    );
  }

  // Insert the merged newInterval (Breakpoint #4)
  result.push(newInterval);
  const { min: intervalsMinIns, max: intervalsMaxIns } = getIntervalBounds(intervals);
  l.intervals("intervals", intervals, [], intervalsMinIns, intervalsMaxIns);
  const { min: newIntervalMinIns, max: newIntervalMaxIns } = getIntervalBounds([newInterval]);
  l.intervals("newInterval", [newInterval], [], newIntervalMinIns, newIntervalMaxIns); // Show final merged/original newInterval
  const { min: resultMinIns, max: resultMaxIns } = getIntervalBounds(result);
  l.intervals("result", result, [], resultMinIns, resultMaxIns); // Show result with newInterval added
  l.simple({ i });
  l.breakpoint(
    4,
    `Inserting the final merged/original newInterval [${newInterval.join(
      ", "
    )}].`
  );

  // Loop 3: Add remaining intervals (Breakpoint #5)
  while (i < intervals.length) {
    const currentInterval = intervals[i];
    result.push(currentInterval);
    i++;

    // Log state inside loop 3
    const { min: intervalsMinL3, max: intervalsMaxL3 } = getIntervalBounds(intervals);
    l.intervals("intervals", intervals, [i - 1], intervalsMinL3, intervalsMaxL3); // Highlight the interval just added
    const { min: newIntervalMinL3, max: newIntervalMaxL3 } = getIntervalBounds([newInterval]);
    l.intervals("newInterval", [newInterval], [], newIntervalMinL3, newIntervalMaxL3);
    const { min: resultMinL3, max: resultMaxL3 } = getIntervalBounds(result);
    l.intervals("result", result, [], resultMinL3, resultMaxL3);
    l.simple({ i });
    const { min: currentIntervalMinL3, max: currentIntervalMaxL3 } = getIntervalBounds([currentInterval]);
    l.intervals("currentInterval", [currentInterval], [], currentIntervalMinL3, currentIntervalMaxL3); // Log the interval just processed
    l.breakpoint(
      5,
      `Adding remaining interval [${currentInterval.join(", ")}].`
    );
  }

  // Final state log (Breakpoint #6)
  const { min: intervalsMinFin, max: intervalsMaxFin } = getIntervalBounds(intervals);
  l.intervals("intervals", intervals, [], intervalsMinFin, intervalsMaxFin);
  const { min: newIntervalMinFin, max: newIntervalMaxFin } = getIntervalBounds([newInterval]);
  l.intervals("newInterval", [newInterval], [], newIntervalMinFin, newIntervalMaxFin);
  const { min: resultMinFin, max: resultMaxFin } = getIntervalBounds(result);
  l.intervals("result", result, [], resultMinFin, resultMaxFin); // Final result array
  l.simple({ i });
  l.breakpoint(6, "Finished processing all intervals. Returning final result.");

  return l.getSteps();
}
