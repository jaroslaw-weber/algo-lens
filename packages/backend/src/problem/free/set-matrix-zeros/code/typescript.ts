// Imports specific utility functions and type definitions from the relative paths
import { Pointer, Pointer2D, Problem, ProblemState, Variable } from "algo-lens-core";
import {
  asArray,
  as2dArray,
  asSimpleValue,
  asStringArray,
  asValueGroup,
  deepClone2DArray, // Keep for reference, will use util version
  asBooleanGroup,
} from "../core/utils"; // Keep for reference

// Defines the interface for the input expected by the setMatrixZeroes function (will be in types.ts)
interface SetMatrixZeroesInput {
  matrix: number[][];
}

// Core algorithm - This function modifies the matrix in-place. Breakpoints will be added.
// Note: The standard structure usually expects generateSteps to return steps,
// and the original function might not be directly called or might return void.
export function setZeroesAlgorithm(matrix: number[][]): void {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let firstRowHasZero = false;
  let firstColHasZero = false;

  // #1 Determine if the first row or first column has any zeros
  for (let i = 0; i < rows; i++) {
    // #2 Check element matrix[i][0]
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      // #3 First column needs to be zeroed. Break check.
      break;
    }
  }

  for (let j = 0; j < cols; j++) {
     // #4 Check element matrix[0][j]
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      // #5 First row needs to be zeroed. Break check.
      break;
    }
  }

  // #6 Use first row and column as markers for other zeros
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      // #7 Check element matrix[i][j]
      if (matrix[i][j] === 0) {
        // #8 Mark corresponding first row/col element
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // #9 Set matrix cells (excluding first row/col) to zero based on markers
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
       // #10 Check markers matrix[i][0] and matrix[0][j]
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
         // #11 Set element matrix[i][j] to 0
        matrix[i][j] = 0;
      }
    }
  }

  // #12 Zero out the first row if needed
  if (firstRowHasZero) {
     // #13 Iterate through first row
    for (let j = 0; j < cols; j++) {
       // #14 Set element matrix[0][j] to 0
      matrix[0][j] = 0;
    }
  }

  // #15 Zero out the first column if needed
  if (firstColHasZero) {
     // #16 Iterate through first column
    for (let i = 0; i < rows; i++) {
       // #17 Set element matrix[i][0] to 0
      matrix[i][0] = 0;
    }
  }
   // #18 Matrix modification complete.
}


// Old step generation function (for reference)
export function setMatrixZeroes_OldSteps(p: SetMatrixZeroesInput): ProblemState[] {
  let { matrix } = p;
  matrix = deepClone2DArray(matrix); // Uses imported clone
  const steps: ProblemState[] = [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  let firstRowHasZero = false;
  let firstColHasZero = false;

  // Helper function (will be replaced by StepLoggerV2)
  function log({ point, description, pointers }: { point: number; description?: string; pointers?: Pointer2D[]; }) {
    const v: Variable[] = [as2dArray("matrix", matrix, pointers ?? [])];
    const step: ProblemState = { variables: v, breakpoint: point, description };
    v.push(asBooleanGroup("flags", { firstRowHasZero, firstColHasZero }));
    steps.push(step);
  }

  log({ point: 1 }); // BP 1: Start

  // Determine if the first row or first column has any zeros
  for (let i = 0; i < rows; i++) {
    log({ point: 2, pointers: [{ r: i, c: 0 }] }); // BP 2
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      log({ point: 3, pointers: [{ r: i, c: 0 }] }); // BP 3
      break;
    }
  }

  for (let j = 0; j < cols; j++) {
    log({ point: 4, pointers: [{ r: 0, c: j }] }); // BP 4
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      log({ point: 5, pointers: [{ r: 0, c: j }] }); // BP 5
      break;
    }
  }

  // Use first row and column as markers
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      log({ point: 6, pointers: [{ r: i, c: j }] }); // BP 6
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
        log({ point: 7, pointers: [{ r: i, c: j }, { r: i, c: 0 }, { r: 0, c: j }] }); // BP 7
      }
    }
  }

  // Set matrix cells to zero based on markers
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      log({ point: 8, pointers: [{ r: i, c: j }] }); // BP 8
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
        log({ point: 9, pointers: [{ r: i, c: j }, { r: 0, c: j }, { r: i, c: 0 }] }); // BP 9
      }
    }
  }

  log({ point: 10 }); // BP 10: Before zeroing first row/col
  // Zero out the first row if needed
  if (firstRowHasZero) {
    log({ point: 11 }); // BP 11
    for (let j = 0; j < cols; j++) {
      matrix[0][j] = 0;
      log({ point: 12, pointers: [{ r: 0, c: j }] }); // BP 12
    }
  }

  log({ point: 13 }); // BP 13: Before zeroing first col
  // Zero out the first column if needed
  if (firstColHasZero) {
    log({ point: 14 }); // BP 14
    for (let i = 0; i < rows; i++) {
      matrix[i][0] = 0;
      log({ point: 15, pointers: [{ r: i, c: 0 }] }); // BP 15
    }
  }

  log({ point: 16 }); // BP 16: Final state

  return steps;
}

// Code string for display - updated with breakpoints
const code = `function setZeroes(matrix: number[][]): void {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let firstRowHasZero = false;
  let firstColHasZero = false;

  //#1 Determine if the first row or first column has any zeros initially.
  for (let i = 0; i < rows; i++) {
    //#2 Check element matrix[i][0] in the first column.
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      //#3 First column needs to be zeroed later. Break check.
      break;
    }
  }

  for (let j = 0; j < cols; j++) {
    //#4 Check element matrix[0][j] in the first row.
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      //#5 First row needs to be zeroed later. Break check.
      break;
    }
  }

  //#6 Use first row and column as markers. Iterate through the rest of the matrix.
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      //#7 Check element matrix[i][j].
      if (matrix[i][j] === 0) {
        //#8 Found a zero. Mark matrix[i][0] and matrix[0][j] as zero.
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  //#9 Set matrix cells (excluding first row/col) to zero based on markers.
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      //#10 Check markers matrix[i][0] and matrix[0][j].
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        //#11 Set element matrix[i][j] to 0.
        matrix[i][j] = 0;
      }
    }
  }

  //#12 Check if the first row needs to be zeroed.
  if (firstRowHasZero) {
    //#13 Iterate through the first row.
    for (let j = 0; j < cols; j++) {
      //#14 Set element matrix[0][j] to 0.
      matrix[0][j] = 0;
    }
  }

  //#15 Check if the first column needs to be zeroed.
  if (firstColHasZero) {
    //#16 Iterate through the first column.
    for (let i = 0; i < rows; i++) {
      //#17 Set element matrix[i][0] to 0.
      matrix[i][0] = 0;
    }
  }
  //#18 Matrix modification complete.
}`;

const title = "Set Matrix Zeroes";
// getInput is usually defined in testcase.ts
// const getInput = () => { ... };

// Problem definition will be moved to problem.ts
export const problem: Problem<SetMatrixZeroesInput /*, ProblemState removed */ > = {
  title,
  emoji: '0️⃣',
  code, // Reference the code string defined above
  // func: setMatrixZeroes_OldSteps, // func is usually removed, rely on generateSteps
  id: "set-matrix-zeroes",
  tags: ["Array", "Hash Table", "Matrix"], // Added relevant tags
};
