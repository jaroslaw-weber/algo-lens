import { ProblemState, TestCase } from "algo-lens-core";
import { SetMatrixZeroesInput } from "./types";

export const testcases: TestCase<SetMatrixZeroesInput, ProblemState>[] = [
  {
    input: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
    expected: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ],
    description: "Simple 3x3 matrix with one zero",
  },
  {
    input: [
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5],
    ],

    expected: [
      [0, 0, 0, 0],
      [0, 4, 5, 0],
      [0, 3, 1, 0],
    ],
    description: "Matrix with zeroes in first row and last column",
  },
  {
    input: [
      [1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
    ],

    expected: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0],
    ],
    description: "Original example matrix from the old file",
  },
  {
    // Changed from 2x2 no-zero matrix (edge case) to 3x4 matrix with zeroes
    input: [
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5],
    ],
    expected: [
      [0, 0, 0, 0],
      [0, 4, 5, 0],
      [0, 3, 1, 0],
    ],
    description: "Matrix with zeroes in first row and last column",
    isDefault: true,
  },
  {
    input: [[0]],
    expected: [[0]],
    description: "Single cell matrix with zero",
  },
  {
    input: [[1]],

    expected: [[1]],
    description: "Single cell matrix without zero",
  },
];
