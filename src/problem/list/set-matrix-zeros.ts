// Imports specific utility functions and type definitions from the relative paths
import { Pointer, Pointer2D, Problem, ProblemState, Variable } from "../types";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
  deepClone2DArray,
  asBooleanGroup,
} from "../utils";

// Defines the interface for the input expected by the setMatrixZeroes function
interface SetMatrixZeroesInput {
  matrix: number[][];
}

/**
 * Implements the setMatrixZeroes algorithm which sets all rows and columns of a matrix to zero if it contains a zero.
 */
export function setMatrixZeroes(p: SetMatrixZeroesInput): ProblemState[] {
  let { matrix } = p;
  matrix = deepClone2DArray(matrix);
  const steps: ProblemState[] = [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  let firstRowHasZero = false;
  let firstColHasZero = false;

  log({ point: 1 });

  // Determine if the first row or first column has any zeros
  for (let i = 0; i < rows; i++) {
    log({ point: 2, pointers: [{ r: i, c: 0 }] });
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      log({ point: 3, pointers: [{ r: i, c: 0 }] });
      break;
    }
  }

  for (let j = 0; j < cols; j++) {
    log({
      point: 4,
      pointers: [
        {
          r: 0,
          c: j,
        },
      ],
    });
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      log({ point: 5, pointers: [{ r: 0, c: j }] });
      break;
    }
  }

  // Use first row and column as markers
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      log({ point: 6, pointers: [{ r: i, c: j }] });
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
        log({
          point: 7,
          pointers: [
            { r: i, c: j },
            { r: i, c: 0 },
            { r: 0, c: j },
          ],
        });
      }
    }
  }

  // Set matrix cells to zero based on markers
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      log({ point: 8, pointers: [{ r: i, c: j }] });
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
        log({
          point: 9,
          pointers: [
            { r: i, c: j },
            { r: 0, c: j },
            { r: i, c: 0 },
          ],
        });
      }
    }
  }

  log({ point: 10 });
  // Zero out the first row if needed
  if (firstRowHasZero) {
    log({ point: 11 });
    for (let j = 0; j < cols; j++) {
      matrix[0][j] = 0;

      log({ point: 12, pointers: [{ r: 0, c: j }] });
    }
  }

  log({ point: 13 });
  // Zero out the first column if needed
  if (firstColHasZero) {
    log({ point: 14 });
    for (let i = 0; i < rows; i++) {
      matrix[i][0] = 0;
      log({ point: 15, pointers: [{ r: i, c: 0 }] });
    }
  }

  // Log the final state
  log({
    point: 16,
    description: "Final state after setting rows and columns to zero",
  });

  return steps;

  // Helper function to create and log each step's computational state
  function log({
    point,
    description,
    pointers,
  }: {
    point: number;
    description?: string;
    pointers?: Pointer2D[];
  }) {
    const v: Variable[] = [as2dArray("matrix", matrix, pointers ?? [])]; //todo: fix bug where i:0,j:0 is sometimes highlighted
    const step: ProblemState = {
      variables: v,
      breakpoint: point,
      description,
    };
    v.push(asBooleanGroup("flags", { firstRowHasZero, firstColHasZero }));
    steps.push(step);
  }
}

// Example implementation of the setMatrixZeroes function for demonstration and testing
const code = `function setMatrixZeroes(matrix: number[][]): void {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let firstRowHasZero = false;
  let firstColHasZero = false;

  //#1 Determine if the first row or first column has any zeros
  for (let i = 0; i < rows; i++) {
    //#2
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      //#3
      break;
    }
  }

  for (let j = 0; j < cols; j++) {
    //#4
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      //#5
      break;
    }
  }

  //Use first row and column as markers
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      //#6
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
        //#7
      }
    }
  }

  //Set matrix cells to zero based on markers
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      //#8
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
        //#9
      }
    }
  }

  //#10 Zero out the first row if needed
  if (firstRowHasZero) {
    //#11
    for (let j = 0; j < cols; j++) {
      matrix[0][j] = 0;
      //#12
    }
  }

  //#13 Zero out the first column if needed
  if (firstColHasZero) {
    //#14
    for (let i = 0; i < rows; i++) {
      matrix[i][0] = 0;
      //#15
    }
  }
  //#16
}`;

// Description for a larger, more complex input set to test and visualize the algorithm
const title = "Set Matrix Zeroes";
const getInput = () => ({
  matrix: [
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
  ],
});

// Export the complete problem setup including the input function, the computational function, and other metadata
export const setMatrixZeroesProblem: Problem<
  SetMatrixZeroesInput,
  ProblemState
> = {
  title,
  code,
  getInput,
  func: setMatrixZeroes,
  id: "set-matrix-zeroes",
};
