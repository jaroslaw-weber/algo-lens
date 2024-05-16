
// Imports specific utility functions and type definitions from the relative paths
import { Problem, ProblemState } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
} from "../utils";

// Defines the interface for the input expected by the setMatrixZeroes function
interface SetMatrixZeroesInput {
  matrix: number[][];
}

/**
 * Implements the setMatrixZeroes algorithm which sets all rows and columns of a matrix to zero if it contains a zero.
 * @param p - The input parameters including a 2D array matrix.
 * @returns An array of ProblemState capturing each step of the computation for visualization.
 */
export function setMatrixZeroes(p: SetMatrixZeroesInput): ProblemState[] {
  const { matrix } = p;
  const steps: ProblemState[] = [];
  const rowsWithZero: boolean[] = new Array(matrix.length).fill(false);
  const colsWithZero: boolean[] = new Array(matrix[0].length).fill(false);

  // Helper function to create and log each step's computational state
  function log(point: number, rowsWithZero?: boolean[], colsWithZero?: boolean[]) {
    const step: ProblemState = {
      variables: [as2dArray("matrix", matrix, [])],
      breakpoint: point,
    };
    if (rowsWithZero !== undefined) {
      step.variables.push(asArray("rowsWithZero", rowsWithZero));
    }
    if (colsWithZero !== undefined) {
      step.variables.push(asArray("colsWithZero", colsWithZero));
    }
    steps.push(step);
  }

  // Initial state log before the loop starts
  log(1);

  // Mark rows and columns with zeros
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        rowsWithZero[i] = true;
        colsWithZero[j] = true;
      }
    }
  }

  // Log the state after marking rows and columns
  log(2, rowsWithZero, colsWithZero);

  // Set rows and columns to zero
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (rowsWithZero[i] || colsWithZero[j]) {
        matrix[i][j] = 0;
      }
    }
  }

  // Log the final state after setting rows and columns to zero
  log(3);

  return steps;
}

// Example implementation of the setMatrixZeroes function for demonstration and testing
const code = `function setMatrixZeroes(matrix: number[][]): void {
  const rowsWithZero: boolean[] = new Array(matrix.length).fill(false);
  const colsWithZero: boolean[] = new Array(matrix[0].length).fill(false);

  //#1 Mark rows and columns with zeros
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        //#2 Mark the row and column as having a zero
        rowsWithZero[i] = true;
        colsWithZero[j] = true;
      }
    }
  }

  //#3 Set rows and columns to zero
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (rowsWithZero[i] || colsWithZero[j]) {
        //#4 Set the cell to zero
        matrix[i][j] = 0;
      }
    }
  }
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Set Matrix Zeroes";
const getInput = () => ({
  matrix: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const setMatrixZeroesProblem: Problem<SetMatrixZeroesInput, ProblemState> = {
  title,
  code,
  getInput,
  func: setMatrixZeroes,
  id: "set-matrix-zeroes",
};
