import { TestCase } from "algo-lens-core";

// Define the input type based on the function signature in code.ts
interface SetMatrixZeroesInput {
  matrix: number[][];
}

// Define the output type based on the expected state of the matrix after modification
type SetMatrixZeroesOutput = number[][];

// Define the test cases for the setZeroes function
// Note: The function modifies the input matrix in-place.
// The 'expected' value represents the state of the 'input.matrix' after the function runs.
export const testcases: Array<TestCase<SetMatrixZeroesInput, SetMatrixZeroesOutput>> = [
  {
    input: {
      matrix: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
      ],
    },
    // Expected output is the modified input matrix
    expected: [
        [1, 0, 1],
        [0, 0, 0],
        [1, 0, 1]
      ],
    description: "Single zero in the middle"
  },
  {
    input: {
      matrix: [
        [0, 1, 2, 0],
        [3, 4, 5, 2],
        [1, 3, 1, 5]
      ],
    },
    expected: [
        [0, 0, 0, 0],
        [0, 4, 5, 0],
        [0, 3, 1, 0]
      ],
    description: "Zeros in the first row"
  },
  {
    input: {
      matrix: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 0]
      ],
    },
    expected: [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]
      ],
    description: "Zero in the last element"
  },
    {
    input: {
      matrix: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
    },
    expected: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
    description: "No zeros in the matrix"
  },
  {
    input: {
      matrix: [
          [0]
      ]
    },
    expected: [
          [0]
      ],
      description: "Single element matrix with zero"
  },
  {
    input: {
        matrix: [
            [1]
        ]
    },
    expected: [
        [1]
    ],
    description: "Single element matrix without zero"
  }
];
