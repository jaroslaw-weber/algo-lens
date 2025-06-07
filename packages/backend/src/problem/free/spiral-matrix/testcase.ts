import { TestCase } from "algo-lens-core";
import { SpiralMatrixInput, SpiralMatrixOutput } from "./types";

export const testcases: TestCase<SpiralMatrixInput, SpiralMatrixOutput>[] = [
  {
    name: "Example 1",
    description: "A 3x3 matrix traversed in spiral order.",
    input: {
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    },
    expected: [1, 2, 3, 6, 9, 8, 7, 4, 5],
    isDefault: true,
  },
  {
    name: "Example 2",
    description: "A 3x4 matrix traversed in spiral order.",
    input: {
      matrix: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ],
    },
    expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
  },
  {
    name: "Single Row Matrix",
    description: "A matrix with a single row.",
    input: { matrix: [[1, 2, 3, 4, 5]] },
    expected: [1, 2, 3, 4, 5],
  },
  {
    name: "Single Column Matrix",
    description: "A matrix with a single column.",
    input: { matrix: [[1], [2], [3], [4], [5]] },
    expected: [1, 2, 3, 4, 5],
  },
  {
    name: "1x1 Matrix",
    description: "A 1x1 matrix.",
    input: { matrix: [[7]] },
    expected: [7],
  },
  {
    name: "2x2 Matrix",
    description: "A 2x2 matrix.",
    input: {
      matrix: [
        [1, 2],
        [3, 4],
      ],
    },
    expected: [1, 2, 4, 3],
  },
  {
    name: "Empty Matrix",
    description: "An empty matrix.",
    input: { matrix: [[]] },
    expected: [],
  },
  {
    name: "2x3 Matrix",
    description: "A 2x3 matrix.",
    input: {
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
      ],
    },
    expected: [1, 2, 3, 6, 5, 4],
  },
  {
    name: "3x2 Matrix",
    description: "A 3x2 matrix.",
    input: {
      matrix: [
        [1, 2],
        [3, 4],
        [5, 6],
      ],
    },
    expected: [1, 2, 4, 6, 5, 3],
  },
];
