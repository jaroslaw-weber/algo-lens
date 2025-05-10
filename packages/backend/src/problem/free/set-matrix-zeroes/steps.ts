import { ProblemState, Pointer2D } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { SetMatrixZeroesInput } from "./types";
import { deepClone2DArray } from "../../core/utils"; // Assuming deepClone2DArray is in core/utils
// Import groups if needed for logger options, though not strictly necessary for basic logging
// import { groups } from "./groups";

export function generateSteps(matrix: number[][]): ProblemState[] {
  // It's crucial to clone the input matrix to avoid modifying the original test case data
  matrix = deepClone2DArray(matrix);
  const l = new StepLoggerV2();
  l.groupOptions.set("zeroFlags", { min: 0, max: 1, reverse: false });

  const rows = matrix.length;
  const cols = matrix[0].length;
  let firstRowHasZero = false;
  let firstColHasZero = false;

  // Initial state
  l.array2d("matrix", matrix);
  l.simple({ rows, cols });
  l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
  l.comment = "Initial state";
  l.breakpoint(1);

  // Determine if the first column has any zeros
  for (let i = 0; i < rows; i++) {
    l.array2d("matrix", matrix, { r: i, c: 0 }); // Changed from array to object
    l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
    l.comment = `Check first column, row i=${i}`;
    l.breakpoint(2);

    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      l.array2d("matrix", matrix, { r: i, c: 0 }); // Changed from array to object
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.breakpoint(
        3,
        `Found zero in first column at row i=${i}, set firstColHasZero = true`
      );
      break;
    }
  }

  // Determine if the first row has any zeros
  for (let j = 0; j < cols; j++) {
    l.array2d("matrix", matrix, { r: 0, c: j }); // Changed from array to object
    l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
    l.comment = `Check first row, column j=${j}`;
    l.breakpoint(4);

    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      l.array2d("matrix", matrix, { r: 0, c: j }); // Changed from array to object
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.breakpoint(
        5,
        `Found zero in first row at column j=${j}, set firstRowHasZero = true`
      );
      break;
    }
  }

  // Use first row and column as markers
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      l.array2d("matrix", matrix, { r: i, c: j }); // Changed from array to object
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Mark zeroes: Check cell (${i}, ${j})`;
      l.breakpoint(6);

      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
        // Highlight the cell and the markers
        const pointers: Pointer2D[] = [
          { r: i, c: j },
          { r: i, c: 0 },
          { r: 0, c: j },
        ];
        l.array2d("matrix", matrix, ...pointers);
        l.simple({ rows, cols, i, j });
        l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
        l.breakpoint(
          7,
          `Mark zeroes: Found zero at (${i}, ${j}). Marked matrix[${i}][0] and matrix[0][${j}]`
        );
      }
    }
  }

  // Set matrix cells to zero based on markers
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      // Highlight the cell and the markers being checked
      const pointers: Pointer2D[] = [
        { r: i, c: j },
        { r: i, c: 0 },
        { r: 0, c: j },
      ];
      l.array2d("matrix", matrix, ...pointers);
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.breakpoint(
        8,
        `Apply markers: Check cell (${i}, ${j}) using markers matrix[${i}][0] and matrix[0][${j}]`
      );

      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
        l.array2d("matrix", matrix, ...pointers); // Show updated matrix with the same pointers
        l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
        l.breakpoint(
          9,
          `Apply markers: Set cell (${i}, ${j}) to zero based on markers`
        );
      }
    }
  }

  l.array2d("matrix", matrix);
  l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
  l.comment = "Prepare to zero out first row/column based on flags";
  l.breakpoint(10);

  // Zero out the first row if needed
  if (firstRowHasZero) {
    l.array2d("matrix", matrix);
    l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
    l.comment = "Zero out first row because firstRowHasZero is true";
    l.breakpoint(11);
    for (let j = 0; j < cols; j++) {
      matrix[0][j] = 0;
      l.array2d("matrix", matrix, { r: 0, c: j }); // Changed from array to object
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Zero out first row: Set cell (0, ${j}) to zero`;
      l.breakpoint(12);
    }
  }

  l.array2d("matrix", matrix);
  l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
  l.comment = "Prepare to zero out first column based on flags";
  l.breakpoint(13);

  // Zero out the first column if needed
  if (firstColHasZero) {
    l.array2d("matrix", matrix);
    l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
    l.comment = "Zero out first column because firstColHasZero is true";
    l.breakpoint(14);
    for (let i = 0; i < rows; i++) {
      matrix[i][0] = 0;
      l.array2d("matrix", matrix, { r: i, c: 0 }); // Changed from array to object
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Zero out first column: Set cell (${i}, 0) to zero`;
      l.breakpoint(15);
    }
  }

  l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
  l.array2d("result", matrix); // Ensure this logs the final state correctly
  l.comment = "Final state after setting rows and columns to zero";
  l.breakpoint(16);

  return l.getSteps();
}
