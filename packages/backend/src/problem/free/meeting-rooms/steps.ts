import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { MeetingRoomsInput } from "./types";

export function generateSteps(input: MeetingRoomsInput): ProblemState[] {
  const l = new StepLoggerV2();
  const intervals = [...input.intervals]; // Create a copy to preserve original input state
  let breakpointNumber = 1;

  // Initial state
  // For Meeting Rooms I, we don't need min/max for intervals visualization
  l.intervalsV2({
    label: "intervals",
    arr: intervals.map((interval) => ({
      interval: interval,
      start: interval[0],
      end: interval[1],
      label: `${interval[0]}-${interval[1]}`,
    })),
    highlight: [],
    min: 0, // Default min
    max: 10, // Default max, will be adjusted by frontend based on intervals if needed
  });
  l.comment = "Initial state: Given intervals.";
  l.breakpoint(breakpointNumber++);

  if (intervals.length === 0) {
    l.intervalsV2({
      label: "intervals",
      arr: [],
      highlight: [],
      min: 0,
      max: 10,
    });
    l.comment =
      "No meetings, so a person can attend all meetings. Result: true";
    l.breakpoint(breakpointNumber++);
    return l.getSteps();
  }

  // Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);
  l.intervalsV2({
    label: "intervals",
    arr: intervals.map((interval) => ({
      interval: interval,
      start: interval[0],
      end: interval[1],
      label: `${interval[0]}-${interval[1]}`,
    })),
    highlight: [],
    min: 0,
    max: 10,
  });
  l.comment = "Sorted intervals by start time.";
  l.breakpoint(breakpointNumber++);

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i];
    const previousInterval = intervals[i - 1];

    l.intervalsV2({
      label: "intervals",
      arr: intervals.map((interval) => ({
        interval: interval,
        start: interval[0],
        end: interval[1],
        label: `${interval[0]}-${interval[1]}`,
      })),
      highlight: [i, i - 1], // Highlight current and previous intervals
      min: 0,
      max: 10,
    });
    l.simple({ i, currentInterval, previousInterval });
    l.comment = `Checking if current meeting overlaps with previous meeting.`;
    l.breakpoint(breakpointNumber++);

    if (currentInterval[0] < previousInterval[1]) {
      l.intervalsV2({
        label: "intervals",
        arr: intervals.map((interval) => ({
          interval: interval,
          start: interval[0],
          end: interval[1],
          label: `${interval[0]}-${interval[1]}`,
        })),
        highlight: [i, i - 1],
        min: 0,
        max: 10,
      });
      l.simple({ i, currentInterval, previousInterval, result: false });
      l.comment = `Overlap detected! Result: false`;
      l.breakpoint(breakpointNumber++);
      return l.getSteps();
    }
  }

  l.intervalsV2({
    label: "intervals",
    arr: intervals.map((interval) => ({
      interval: interval,
      start: interval[0],
      end: interval[1],
      label: `${interval[0]}-${interval[1]}`,
    })),
    highlight: [],
    min: 0,
    max: 10,
  });
  l.simple({ result: true });
  l.comment = "No overlaps found. All meetings can be attended. Result: true";
  l.breakpoint(breakpointNumber++);

  return l.getSteps();
}
