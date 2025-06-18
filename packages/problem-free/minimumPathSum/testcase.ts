import { TestCase } from "algo-lens-core/src/types";

import { MinPathSumInput } from "./types";

// Define the type for the test cases using the imported interfaces
type MinPathSumTestCase = TestCase<MinPathSumInput, any>; // Use 'any' for State if not specifically typed

export const testcases = [
  {
    input: {
      grid: [
        [1, 3, 1],
        [1, 5, 1],
        [4, 2, 1],
      ],
    },
    expected: 7,
    name: "Standard 3x3 grid",
    description: "Standard 3x3 grid",
  },
  {
    input: { grid: [[1, 2, 3]] },
    expected: 6,
    name: "Single row grid",
    description: "Single row grid",
  },
  {
    // Changed from 3x1 grid (edge case) to 3x3 grid
    input: {
      grid: [
        [1, 3, 1],
        [1, 5, 1],
        [4, 2, 1],
      ],
    },
    expected: 7,
    name: "Standard 3x3 grid",
    description: "Standard 3x3 grid",
    isDefault: true,
  },
  {
    input: {
      grid: [
        [1, 2],
        [1, 1],
      ],
    },
    expected: 3,
    name: "Simple 2x2 grid",
    description: "Simple 2x2 grid",
  },
];
