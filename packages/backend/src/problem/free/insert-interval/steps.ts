import { ProblemState } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2"; // Adjusted path
import { getIntervalBounds } from "algo-lens-core/src/utils"; // Import the utility function
import { Interval } from "./types";
import { LabeledInterval } from "algo-lens-core";
import _ = require("lodash");

export function generateSteps(
  intervals: Interval[],
  newInterval: Interval
): ProblemState[] {
  const l = new StepLoggerV2();

  const allintervals = [...intervals, newInterval];
  const { min: minValue, max: maxValue } = getIntervalBounds(allintervals);

  let result: Interval[] = [];
  let i = 0;

  // Log initial state (Breakpoint #1 in code.ts corresponds to this)
  l.intervalsV2({
    label: "intervals",
    arr: intervals.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
    highlight: [],
    min: minValue,
    max: maxValue,
  });
  l.intervalsV2({
    label: "newInterval",
    arr: [newInterval].map((i) => ({
      interval: i,
      label: `[${i[0]}, ${i[1]}]`,
    })),
    highlight: [],
    min: minValue,
    max: maxValue,
  });
  l.intervalsV2({
    label: "result",
    arr: result.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
    highlight: [],
    min: minValue,
    max: maxValue,
  });
  l.breakpoint(1);
  l.comment = "Initial state before processing intervals.";

  // Loop 1: Add intervals before newInterval (Breakpoint #2)
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    const currentInterval = intervals[i];
    result.push(currentInterval);
    i++;

    // Log state inside loop 1
    l.intervalsV2({
      label: "intervals",
      arr: intervals.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
      highlight: [i - 1],
      min: minValue,
      max: maxValue,
    }); // Highlight the interval just added
    l.intervalsV2({
      label: "newInterval",
      arr: [newInterval].map((i) => ({
        interval: i,
        label: `[${i[0]}, ${i[1]}]`,
      })),
      highlight: [],
      min: minValue,
      max: maxValue,
    });
    l.intervalsV2({
      label: "result",
      arr: result.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
      highlight: [],
      min: minValue,
      max: maxValue,
    });
    l.intervalsV2({
      label: "currentInterval",
      arr: [currentInterval].map((i) => ({
        interval: i,
        label: `[${i[0]}, ${i[1]}]`,
      })),
      highlight: [],
      min: minValue,
      max: maxValue,
    }); // Log the interval just processed

    l.breakpoint(2);
    l.comment = `Current interval ends before new. Add to result.`;
  }

  // Log state before loop 2
  l.intervalsV2({
    label: "intervals",
    arr: intervals.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
    highlight: [],
    min: minValue,
    max: maxValue,
  }); // Show intervals before merge loop
  l.intervalsV2({
    label: "newInterval",
    arr: [newInterval].map((i) => ({
      interval: i,
      label: `[${i[0]}, ${i[1]}]`,
    })),
    highlight: [],
    min: minValue,
    max: maxValue,
  }); // Show newInterval before merge loop
  l.intervalsV2({
    label: "result",
    arr: result.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
    highlight: [],
    min: minValue,
    max: maxValue,
  });

  l.breakpoint(3);
  l.comment = "Starting merge phase. Checking for overlaps with newInterval.";

  // Loop 2: Merge overlapping intervals (Breakpoint #3)
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    const currentInterval = intervals[i];
    const currentStart = currentInterval[0];
    const currentEnd = currentInterval[1];
    const newStart = newInterval[0];
    const newEnd = newInterval[1];
    newInterval = [
      Math.min(currentStart, newStart),
      Math.max(currentEnd, newEnd),
    ];
    i++;

    l.intervalsV2({
      label: "intervals",
      arr: intervals.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
      highlight: [i - 1],
      min: minValue,
      max: maxValue,
    }); // Highlight the interval just merged
    l.intervalsV2({
      label: "newInterval",
      arr: [newInterval].map((i) => ({
        interval: i,
        label: `[${i[0]}, ${i[1]}]`,
      })),
      highlight: [],
      min: minValue,
      max: maxValue,
    }); // Show updated newInterval
    l.intervalsV2({
      label: "result",
      arr: result.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
      highlight: [],
      min: minValue,
      max: maxValue,
    });

    l.intervalsV2({
      label: "currentInterval",
      arr: [currentInterval].map((i) => ({
        interval: i,
        label: `[${i[0]}, ${i[1]}]`,
      })),
      highlight: [],
      min: minValue,
      max: maxValue,
    }); // Log the interval just processed
    l.breakpoint(4);
    l.comment = `Current interval overlaps. Merge into new interval.`;
  }

  result.push(newInterval);
  l.intervalsV2({
    label: "intervals",
    arr: intervals.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
    highlight: [],
    min: minValue,
    max: maxValue,
  });
  l.intervalsV2({
    label: "newInterval",
    arr: [newInterval].map((i) => ({
      interval: i,
      label: `[${i[0]}, ${i[1]}]`,
    })),
    highlight: [],
    min: minValue,
    max: maxValue,
  }); // Show final merged/original newInterval
  l.intervalsV2({
    label: "result",
    arr: result.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
    highlight: [],
    min: minValue,
    max: maxValue,
  }); // Show result with newInterval added

  l.breakpoint(5);
  l.comment = `Inserting the final merged/original newInterval [${newInterval.join(
    ", "
  )}].`;

  // Log state before loop 3
  l.intervalsV2({
    label: "intervals",
    arr: intervals.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
    highlight: [],
    min: minValue,
    max: maxValue,
  }); // Show intervals before loop
  l.intervalsV2({
    label: "newInterval",
    arr: [newInterval].map((i) => ({
      interval: i,
      label: `[${i[0]}, ${i[1]}]`,
    })),
    highlight: [],
    min: minValue,
    max: maxValue,
  });
  l.intervalsV2({
    label: "result",
    arr: result.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
    highlight: [],
    min: minValue,
    max: maxValue,
  });

  l.breakpoint(6);
  l.comment = "Starting phase to add remaining intervals after newInterval.";

  // Loop 3: Add remaining intervals (Breakpoint #5)
  while (i < intervals.length) {
    const currentInterval = intervals[i];
    result.push(currentInterval);
    i++;

    // Log state adding remaining interval
    l.intervalsV2({
      label: "intervals",
      arr: intervals.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
      highlight: [i - 1],
      min: minValue,
      max: maxValue,
    }); // Highlight the interval just added
    l.intervalsV2({
      label: "newInterval",
      arr: [newInterval].map((i) => ({
        interval: i,
        label: `[${i[0]}, ${i[1]}]`,
      })),
      highlight: [],
      min: minValue,
      max: maxValue,
    });
    l.intervalsV2({
      label: "result",
      arr: result.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
      highlight: [],
      min: minValue,
      max: maxValue,
    });
    l.intervalsV2({
      label: "currentInterval",
      arr: [currentInterval].map((i) => ({
        interval: i,
        label: `[${i[0]}, ${i[1]}]`,
      })),
      highlight: [],
      min: minValue,
      max: maxValue,
    }); // Log the interval just processed
    l.breakpoint(7);
    l.comment = `Current interval starts after merged. Add to result.`;
  }

  // Final state log (Breakpoint #6)
  l.intervalsV2({
    label: "intervals",
    arr: intervals.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
    highlight: [],
    min: minValue,
    max: maxValue,
  });
  l.intervalsV2({
    label: "newInterval",
    arr: [newInterval].map((i) => ({
      interval: i,
      label: `[${i[0]}, ${i[1]}]`,
    })),
    highlight: [],
    min: minValue,
    max: maxValue,
  });
  l.intervalsV2({
    label: "result",
    arr: result.map((i) => ({ interval: i, label: `[${i[0]}, ${i[1]}]` })),
    highlight: [],
    min: minValue,
    max: maxValue,
  }); // Final result array

  l.breakpoint(6);
  l.comment = "Finished processing all intervals. Returning final result.";

  return l.getSteps();
}
