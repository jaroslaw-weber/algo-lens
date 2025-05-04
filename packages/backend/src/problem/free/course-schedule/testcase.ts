import { TestCase } from "algo-lens-core";
import { CourseScheduleInput } from "./types";
// Removed import for CourseScheduleInput

// Reverted TestCase signature to use tuple input type
export const testcases: TestCase<CourseScheduleInput, boolean>[] = [
  // Test case 1
  {
    input: [
      2,
      [
        [1, 0],
        [0, 1],
      ],
    ],
    expected: true,
    description: "Test case 1: The prerequisites are correctly represented.",
  },

  // Test case 2
  {
    input: [
      2,
      [
        [1, 0],
        [1, 1],
      ],
    ],
    expected: false,
    description:
      "Test case 2: There are two courses that have a prerequisite relationship, but one course cannot be taken before the other.",
  },

  // Test case 3
  {
    input: [
      3,
      [
        [1, 0],
        [1, 2],
        [2, 0],
      ],
    ],
    expected: true,
    description:
      "Test case 3: The prerequisites are correctly represented and all courses can be taken.",
  },

  // Test case 4
  {
    input: [
      4,
      [
        [1, 0],
        [2, 1],
        [3, 2],
      ],
    ],
    expected: true,
    description:
      "Test case 4: Linear dependency chain, all courses can be taken.",
  },
];
