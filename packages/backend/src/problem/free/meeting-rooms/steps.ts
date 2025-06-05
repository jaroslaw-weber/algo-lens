import { Variable } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Correct import path for StepLoggerV2
import { Step, Interval, MeetingRoomsInput } from "./types";

export function generateSteps(input: MeetingRoomsInput): Step[] {
  const l = new StepLoggerV2();
  const intervals = [...input.intervals]; // Create a copy to preserve original input state
  let breakpointNumber = 1;

  // Initial state
  l.intervals("intervals", intervals);
  l.comment = "Initial state: Given intervals.";
  l.breakpoint(breakpointNumber++);

  if (intervals.length === 0) {
    l.intervals("intervals", intervals);
    l.comment =
      "No meetings, so a person can attend all meetings. Result: true";
    l.breakpoint(breakpointNumber++);
    return l.getSteps();
  }

  // Sort intervals
  intervals.sort((a, b) => a[0] - b[0]);
  l.intervals("intervals", intervals);
  l.comment = "Sorted intervals by start time.";
  l.breakpoint(breakpointNumber++);

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i];
    const previousInterval = intervals[i - 1];

    l.intervals("intervals", intervals, [i, i - 1]);
    l.simple({ i, currentInterval, previousInterval });
    l.comment = `Checking if current meeting overlaps with previous meeting.`;
    l.breakpoint(breakpointNumber++);

    if (currentInterval[0] < previousInterval[1]) {
      l.intervals(
        "intervals",
        intervals,
        [i, i - 1],
        undefined,
        undefined,
        true
      ); // Highlight with error
      l.simple({ i, currentInterval, previousInterval, result: false });
      l.comment = `Overlap detected! Result: false`;
      l.breakpoint(breakpointNumber++);
      return l.getSteps();
    }
  }

  l.intervals("intervals", intervals);
  l.simple({ result: true });
  l.comment = "No overlaps found. All meetings can be attended. Result: true";
  l.breakpoint(breakpointNumber++);

  return l.getSteps();
}
