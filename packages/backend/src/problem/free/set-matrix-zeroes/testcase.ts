import { TestCase } from "algo-lens-core";
import { SetMatrixZeroesInput } from "./types";

// Define the expected output type - in this case, it's the modified matrix itself.
type SetMatrixZeroesOutput = number[][];

export const testcases: TestCase<
  SetMatrixZeroesInput,
  SetMatrixZeroesOutput
>[] = [
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
    input: [
      [1, 1],
      [1, 1],
    ],

    expected: [
      [1, 1],
      [1, 1],
    ],
    description: "Matrix with no zeroes",
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
