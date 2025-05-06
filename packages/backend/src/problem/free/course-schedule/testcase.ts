import { TestCase } from "algo-lens-core";
import { CourseScheduleInput } from "./types";
// Removed import for CourseScheduleInput - Keeping this comment as it was in the original

// Reverted TestCase signature to use tuple input type - Keeping this comment as it was in the original
export const testcases = [
  {
    input: [
      2,
      [
        [1, 0],
        [0, 1],
      ],
    ],
    expected: false,
    description: "Test Case 1: Direct cycle (0 -> 1, 1 -> 0)",
  },
  {
    input: [
      2,
      [
        [1, 0],
        [1, 1],
      ],
    ],
    expected: false,
    description: "Test Case 2: Self-loop cycle (1 -> 1)",
  },
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
    description: "Test Case 3: Valid DAG (0 -> 1, 2 -> 1, 0 -> 2)",
  },
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
    description: "Test Case 4: Linear dependency chain (0 -> 1 -> 2 -> 3)",
  },
  {
    input: [0, []],
    expected: true,
    description: "Test Case 5: Edge case - 0 courses",
  },
  {
    input: [1, []],
    expected: true,
    description: "Test Case 6: Edge case - 1 course, no prerequisites",
  },
  {
    input: [3, []],
    expected: true,
    description: "Test Case 7: No prerequisites",

    isDefault: true,
  },
  {
    input: [
      5,
      [
        [1, 0], // Component 1: 0 -> 1
        [3, 2], // Component 2: 2 -> 3
        // Course 4 is isolated
      ],
    ],
    expected: true,
    description: "Test Case 8: Disconnected components",
  },
  {
    input: [
      3,
      [
        [1, 0],
        [2, 1],
        [0, 2], // Cycle: 0 -> 1 -> 2 -> 0
      ],
    ],
    expected: false,
    description: "Test Case 9: Longer cycle (3 nodes)",
  },
  {
    input: [
      4,
      [
        [1, 0],
        [0, 1], // Cycle 1: 0 -> 1 -> 0
        [3, 2],
        [2, 3], // Cycle 2: 2 -> 3 -> 2
      ],
    ],
    expected: false,
    description: "Test Case 10: Multiple cycles in disconnected components",
  },
  {
    input: [
      6,
      [
        [1, 0],
        [2, 0],
        [3, 1],
        [4, 1],
        [5, 2],
        [5, 4], // More complex DAG
      ],
    ],
    expected: true,
    description: "Test Case 11: Larger valid DAG",
  },
  {
    input: [
      // Added another complex DAG case
      7,
      [
        [1, 0],
        [2, 0],
        [3, 1],
        [3, 2],
        [4, 3],
        [5, 3],
        [6, 4],
        [6, 5],
      ],
    ],
    expected: true,
    description: "Test Case 12: Complex DAG with multiple paths",
  },
];
