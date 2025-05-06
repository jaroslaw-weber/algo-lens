import { TestCase } from "algo-lens-core";
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
    description: "Standard 3x3 grid",
  },
  {
    input: { grid: [[1, 2, 3]] },
    expected: 6,
    description: "Single row grid",
  },
  {
    input: { grid: [[1], [2], [3]] },
    expected: 6,
    description: "Single column grid",

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
    description: "Simple 2x2 grid",
  },
];
