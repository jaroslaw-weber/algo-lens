import { Variable } from "algo-lens-core";
import { Step, Interval } from "./types";

export function solution(intervals: Interval[]): boolean {
  if (intervals.length === 0) {
    return true;
  }

  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }

  return true;
}

export function generateSteps(intervals: Interval[]): Step[] {
  const steps: Step[] = [];
  const variables: Variable[] = [];

  // Initial state
  steps.push({
    snapshot: {
      variables: [
        { name: "intervals", value: intervals, type: "array", group: "input" },
      ],
      visualizer: {
        type: "intervals",
        data: intervals,
      },
    },
    log: "Initial state: Given intervals.",
  });

  if (intervals.length === 0) {
    steps.push({
      snapshot: {
        variables: [
          {
            name: "intervals",
            value: intervals,
            type: "array",
            group: "input",
          },
        ],
        visualizer: {
          type: "intervals",
          data: intervals,
        },
      },
      log: "No meetings, so a person can attend all meetings.",
    });
    return steps;
  }

  // Sort intervals
  intervals.sort((a, b) => a[0] - b[0]);
  steps.push({
    snapshot: {
      variables: [
        { name: "intervals", value: intervals, type: "array", group: "input" },
      ],
      visualizer: {
        type: "intervals",
        data: intervals,
      },
    },
    log: "Sorted intervals by start time.",
  });

  for (let i = 1; i < intervals.length; i++) {
    const currentInterval = intervals[i];
    const previousInterval = intervals[i - 1];

    steps.push({
      snapshot: {
        variables: [
          {
            name: "intervals",
            value: intervals,
            type: "array",
            group: "input",
          },
          { name: "i", value: i, type: "number", group: "computation" },
          {
            name: "currentInterval",
            value: currentInterval,
            type: "array",
            group: "computation",
          },
          {
            name: "previousInterval",
            value: previousInterval,
            type: "array",
            group: "computation",
          },
        ],
        visualizer: {
          type: "intervals",
          data: intervals,
          highlight: [i, i - 1],
        },
      },
      log: `Checking if current meeting [${currentInterval[0]}, ${currentInterval[1]}] overlaps with previous meeting [${previousInterval[0]}, ${previousInterval[1]}].`,
    });

    if (currentInterval[0] < previousInterval[1]) {
      steps.push({
        snapshot: {
          variables: [
            {
              name: "intervals",
              value: intervals,
              type: "array",
              group: "input",
            },
            { name: "i", value: i, type: "number", group: "computation" },
            {
              name: "currentInterval",
              value: currentInterval,
              type: "array",
              group: "computation",
            },
            {
              name: "previousInterval",
              value: previousInterval,
              type: "array",
              group: "computation",
            },
          ],
          visualizer: {
            type: "intervals",
            data: intervals,
            highlight: [i, i - 1],
            error: true,
          },
        },
        log: `Overlap detected! Meeting [${currentInterval[0]}, ${currentInterval[1]}] starts before previous meeting [${previousInterval[0]}, ${previousInterval[1]}] ends.`,
      });
      return steps;
    }
  }

  steps.push({
    snapshot: {
      variables: [
        { name: "intervals", value: intervals, type: "array", group: "input" },
      ],
      visualizer: {
        type: "intervals",
        data: intervals,
      },
    },
    log: "No overlaps found. All meetings can be attended.",
  });

  return steps;
}
