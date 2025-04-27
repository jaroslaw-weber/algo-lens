import { ProblemState } from "algo-lens-core";
import { StepLogger } from "../../core/StepLogger"; // Adjusted path
import { InsertIntervalInput, Interval } from "./types";
import { groups } from "./groups"; // Import groups

export function generateSteps(p: InsertIntervalInput): ProblemState[] {
  const l = new StepLogger();
  const { intervals: initialIntervals, newInterval: initialNewInterval } = p;
  // Make copies to avoid modifying the input directly, especially newInterval
  let intervals = initialIntervals.map(interval => [...interval]) as Interval[];
  let newInterval = [...initialNewInterval] as Interval;

  let result: Interval[] = [];
  let i = 0;

  const inputGroup = groups.find(g => g.name === "input")!.name;
  const resultArrayGroup = groups.find(g => g.name === "result_array")!.name;
  const loopMergingGroup = groups.find(g => g.name === "loop_merging")!.name;

  // Log initial state (Breakpoint #1 in code.ts corresponds to this)
  l.json("intervals", intervals, [], inputGroup);
  l.json("newInterval", newInterval, [], inputGroup);
  l.json("result", result, [], resultArrayGroup);
  l.simple({ i }, loopMergingGroup);
  l.breakpoint(1, "Initial state before processing intervals.");
  l.save();

  // Loop 1: Add intervals before newInterval (Breakpoint #2)
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    const currentInterval = intervals[i];
    result.push(currentInterval);
    i++;

    // Log state inside loop 1
    l.json("intervals", intervals, [i - 1], inputGroup); // Highlight the interval just added
    l.json("newInterval", newInterval, [], inputGroup);
    l.json("result", result, [], resultArrayGroup);
    l.simple({ i }, loopMergingGroup);
    l.json("currentInterval", currentInterval, [], loopMergingGroup); // Log the interval just processed
    l.breakpoint(2, `Adding interval [${currentInterval.join(', ')}] as it ends before newInterval starts.`);
    l.save();
  }

  // Loop 2: Merge overlapping intervals (Breakpoint #3)
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    const currentInterval = intervals[i];
    newInterval[0] = Math.min(currentInterval[0], newInterval[0]);
    newInterval[1] = Math.max(currentInterval[1], newInterval[1]);
    i++;

    // Log state inside loop 2
    l.json("intervals", intervals, [i - 1], inputGroup); // Highlight the interval just merged
    l.json("newInterval", newInterval, [], inputGroup); // Show updated newInterval
    l.json("result", result, [], resultArrayGroup);
    l.simple({ i }, loopMergingGroup);
    l.json("currentInterval", currentInterval, [], loopMergingGroup); // Log the interval just processed
    l.breakpoint(3, `Merging interval [${currentInterval.join(', ')}] into newInterval. Updated newInterval: [${newInterval.join(', ')}].`);
    l.save();
  }

  // Insert the merged newInterval (Breakpoint #4)
  result.push(newInterval);
  l.json("intervals", intervals, [], inputGroup);
  l.json("newInterval", newInterval, [], inputGroup); // Show final merged/original newInterval
  l.json("result", result, [], resultArrayGroup); // Show result with newInterval added
  l.simple({ i }, loopMergingGroup);
  l.breakpoint(4, `Inserting the final merged/original newInterval [${newInterval.join(', ')}].`);
  l.save();


  // Loop 3: Add remaining intervals (Breakpoint #5)
  while (i < intervals.length) {
    const currentInterval = intervals[i];
    result.push(currentInterval);
    i++;

    // Log state inside loop 3
    l.json("intervals", intervals, [i - 1], inputGroup); // Highlight the interval just added
    l.json("newInterval", newInterval, [], inputGroup);
    l.json("result", result, [], resultArrayGroup);
    l.simple({ i }, loopMergingGroup);
    l.json("currentInterval", currentInterval, [], loopMergingGroup); // Log the interval just processed
    l.breakpoint(5, `Adding remaining interval [${currentInterval.join(', ')}].`);
    l.save();
  }

  // Final state log (Breakpoint #6)
  l.json("intervals", intervals, [], inputGroup);
  l.json("newInterval", newInterval, [], inputGroup);
  l.json("result", result, [], resultArrayGroup); // Final result array
  l.simple({ i }, loopMergingGroup);
  l.breakpoint(6, "Finished processing all intervals. Returning final result.");
  l.save();


  return l.getSteps();
}
