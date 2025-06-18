import { TestCase } from "algo-lens-core/src/types";

import { MeetingRoomsInput, Interval } from "./types";

export const testcases: TestCase<MeetingRoomsInput, boolean>[] = [
  {
    name: "Example 1",
    input: {
      intervals: [
        [0, 30],
        [5, 10],
        [15, 20],
      ],
    },
    expected: false,
    description: "Overlapping intervals",
  },
  {
    name: "Example 2",
    input: {
      intervals: [
        [7, 10],
        [2, 4],
      ],
    },
    expected: true,
    description: "Non-overlapping intervals",
    isDefault: true,
  },
  {
    name: "Single meeting",
    input: { intervals: [[1, 5]] },
    expected: true,
    description: "Single meeting should always be possible",
  },
  {
    name: "Multiple non-overlapping meetings",
    input: {
      intervals: [
        [1, 3],
        [4, 6],
        [7, 9],
      ],
    },
    expected: true,
    description: "Multiple non-overlapping meetings",
  },
  {
    name: "Meetings with same start time",
    input: {
      intervals: [
        [1, 5],
        [1, 10],
      ],
    },
    expected: false,
    description: "Meetings with same start time and overlap",
  },
];
