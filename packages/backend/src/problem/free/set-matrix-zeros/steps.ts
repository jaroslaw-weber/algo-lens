import { ProblemState, Variable, Pointer2D } from "algo-lens-core";
import { SetMatrixZeroesInput } from "./types";
import { asMatrix, asFlags } from "./variables";
import { deepClone2DArray } from "../../core/utils"; // Import deepClone

/**
 * Implements the setMatrixZeroes algorithm which sets all rows and columns of a matrix to zero if it contains a zero.
 * Generates steps for visualization.
 */
export function setMatrixZeroesSteps(p: SetMatrixZeroesInput): ProblemState[] {
  // Clone matrix to avoid modifying input directly during visualization
  let matrix = deepClone2DArray(p.matrix);
  const steps: ProblemState[] = [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  let firstRowHasZero = false;
  let firstColHasZero = false;

  // Helper function to log state
  function log(point: number, pointers: Pointer2D[] = [], description?: string) {
    const variables: Variable[] = [
      asMatrix(matrix, pointers),
      asFlags(firstRowHasZero, firstColHasZero),
    ];
    steps.push({ variables, breakpoint: point, description });
  }

  log(1); // #1 Initial state

  // #1 Determine if the first row or first column has any zeros
  for (let i = 0; i < rows; i++) {
    log(2, [{ r: i, c: 0 }]); // #2 Check element in first col
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      log(3, [{ r: i, c: 0 }]); // #3 Found zero, set flag
      break; // No need to check further in this column
    }
  }

  // Check first row only if firstColHasZero wasn't set by matrix[0][0]
  if (!firstRowHasZero) {
      for (let j = 0; j < cols; j++) {
          log(4, [{ r: 0, c: j }]); // #4 Check element in first row
          if (matrix[0][j] === 0) {
              firstRowHasZero = true;
              log(5, [{ r: 0, c: j }]); // #5 Found zero, set flag
              break; // No need to check further in this row
          }
      }
  }


  // # Use first row and column as markers for zeros in the rest of the matrix
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      log(6, [{ r: i, c: j }]); // #6 Check element matrix[i][j]
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0; // Mark first col
        matrix[0][j] = 0; // Mark first row
        log(7, [{ r: i, c: j }, { r: i, c: 0 }, { r: 0, c: j }]); // #7 Mark corresponding elements in first row/col
      }
    }
  }

  // # Set matrix cells (excluding first row/col) to zero based on markers
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      // Highlight markers and current cell
      log(8, [{ r: i, c: j }, { r: i, c: 0 }, { r: 0, c: j }]); // #8 Check markers for matrix[i][j]
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
        log(9, [{ r: i, c: j }, { r: i, c: 0 }, { r: 0, c: j }]); // #9 Set matrix[i][j] to 0
      }
    }
  }

  // #10 Zero out the first row if needed
  log(10);
  if (firstRowHasZero) {
    log(11); // #11 Start zeroing first row
    for (let j = 0; j < cols; j++) {
      matrix[0][j] = 0;
      log(12, [{ r: 0, c: j }]); // #12 Zeroing element matrix[0][j]
    }
  }

  // #13 Zero out the first column if needed
  log(13);
  if (firstColHasZero) {
    log(14); // #14 Start zeroing first col
    for (let i = 0; i < rows; i++) {
      matrix[i][0] = 0;
      log(15, [{ r: i, c: 0 }]); // #15 Zeroing element matrix[i][0]
    }
  }

  // #16 Final state
  log(16, [], "Final state after setting rows and columns to zero");

  return steps;
}
