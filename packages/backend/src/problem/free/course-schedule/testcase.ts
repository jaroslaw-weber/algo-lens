import { TestCase } from "algo-lens-core";
import { CourseScheduleInput } from "./types";
// Removed import for CourseScheduleInput

// Reverted TestCase signature to use tuple input type
export const testcases: TestCase<CourseScheduleInput, boolean>[] = [
  // Existing cases (reverted format)
  {
    input: [
      // numCourses: 10
      10,
      [
        [1, 0],
        [2, 0],
        [3, 1],
        [3, 2],
        [4, 2],
        [5, 3],
        [5, 4],
        [6, 0],
        [7, 6],
        [8, 7],
        [9, 8],
      ],
    ],
    expected: true,
  },
  {
    input: [2, [[1, 0]]], // numCourses: 2
    expected: true,
  },
  {
    input: [
      2,
      [
        [1, 0],
        [0, 1],
      ],
    ], // numCourses: 2
    expected: false,
  },
  {
    input: [3, []], // numCourses: 3
    expected: true,
  },
  {
    input: [
      4,
      [
        [1, 0],
        [2, 1],
        [3, 2],
        [1, 3],
      ],
    ], // numCourses: 4, Cycle: 1->2->3<-1 (Corrected interpretation: 1 needs 3) -> Cycle is 1->2->3, and 1 needs 3. This forms a cycle 1->2->3<-1. Wait, my previous reasoning was wrong. 1 needs 3, 3 needs 2, 2 needs 1. This IS a cycle 1->2->3->1 (in terms of dependency). The expected: false is correct.
    expected: false,
  },

  // Added generated cases (reverted format)
  {
    input: [1, []], // numCourses: 1
    expected: true,
  },
  {
    input: [
      3,
      [
        [0, 1],
        [0, 2],
        [1, 2],
      ],
    ], // numCourses: 3
    expected: true,
  },
  {
    input: [
      5,
      [
        [1, 0],
        [2, 1],
        [3, 2],
        [4, 3],
      ],
    ], // numCourses: 5
    expected: true,
  },
  {
    input: [
      3,
      [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
    ], // numCourses: 3
    expected: false,
  },
  {
    input: [
      6,
      [
        [1, 0],
        [2, 1],
        [3, 1],
        [4, 2],
        [4, 3],
        [5, 4],
        [5, 0],
      ],
    ], // numCourses: 6
    expected: true,
  },
  {
    input: [
      4,
      [
        [0, 1],
        [2, 3],
        [1, 2],
        [3, 0],
      ],
    ], // numCourses: 4
    expected: false,
  },
];
