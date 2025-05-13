import { ProblemState, Pointer2D } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
import { SetMatrixZeroesInput } from "./types";
import { deepClone2DArray } from "../../core/utils"; // Assuming deepClone2DArray is in core/utils
// Import groups if needed for logger options, though not strictly necessary for basic logging
// import { groups } from "./groups";

export function generateSteps(matrix: number[][]): ProblemState[] {
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
  l.comment =
    "Initialize the state with the input matrix, its dimensions (rows and cols), and two boolean flags (firstRowHasZero and firstColHasZero) to track if the first row or first column originally contained any zeros. These flags are initially false.";
  l.breakpoint(1);

  // Determine if the first column has any zeros
  for (let i = 0; i < rows; i++) {
    l.array2d("matrix", matrix, { r: i, c: 0 }); // Changed from array to object
    l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
    l.comment = `Check if any element in the first column (at matrix[${i}][0]) is zero. This is done by iterating through each row i from 0 to rows - 1.`;
    l.breakpoint(2);

    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      l.array2d("matrix", matrix, { r: i, c: 0 }); // Changed from array to object
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.breakpoint(3);
      l.comment = `Found zero in first column at row i=${i}, set firstColHasZero = true`;
      break;
    }
  }

  // Determine if the first row has any zeros
  for (let j = 0; j < cols; j++) {
    l.array2d("matrix", matrix, { r: 0, c: j }); // Changed from array to object
    l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
    l.comment = `Check if any element in the first row (at matrix[0][${j}]) is zero. This is done by iterating through each column j from 0 to cols - 1.`;
    l.breakpoint(4);

    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      l.array2d("matrix", matrix, { r: 0, c: j }); // Changed from array to object
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Found zero in first row at column j=${j}, set firstRowHasZero = true`;
      l.breakpoint(5);
      break;
    }
  }

  // Use first row and column as markers
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      l.array2d("matrix", matrix, { r: i, c: j }); // Changed from array to object
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Iterate through the matrix starting from the second row and second column (i=1, j=1). For the current cell at (${i}, ${j}), check if its value is zero.`;
      l.breakpoint(6);

      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
        // Highlight the cell and the markers
        // HIDE_START
        const pointers: Pointer2D[] = [
          { r: i, c: j },
          { r: i, c: 0 },
          { r: 0, c: j },
        ];
        // HIDE_END
        l.array2d("matrix", matrix, ...pointers);
        l.simple({ rows, cols, i, j });
        l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
        l.comment = `Mark zeroes: Found zero at (${i}, ${j}). Marked matrix[${i}][0] and matrix[0][${j}]`;
        l.breakpoint(7);
      }
    }
  }

  // Set matrix cells to zero based on markers
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      // Highlight the cell and the markers being checked
      // HIDE_START
      const pointers: Pointer2D[] = [
        { r: i, c: j },
        { r: i, c: 0 },
        { r: 0, c: j },
      ];
      // HIDE_END
      l.array2d("matrix", matrix, ...pointers);
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Apply markers: Check cell (${i}, ${j}) using markers matrix[${i}][0] and matrix[0][${j}]`;
      l.breakpoint(8);

      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
        l.array2d("matrix", matrix, ...pointers); // Show updated matrix with the same pointers
        l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
        l.comment = `Apply markers: Set cell (${i}, ${j}) to zero based on markers`;
        l.breakpoint(9);
      }
    }
  }

  l.array2d("matrix", matrix);
  l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
  l.comment =
    "After using the first row and column as markers to zero out the rest of the matrix, now check the firstRowHasZero and firstColHasZero flags to determine if the original matrix had zeros in the first row or column.";
  l.breakpoint(10);

  // Zero out the first row if needed
  if (firstRowHasZero) {
    l.array2d("matrix", matrix);
    l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
    l.comment =
      "The firstRowHasZero flag is true, indicating that the original matrix had at least one zero in the first row. Therefore, set all elements in the first row to zero.";
    l.breakpoint(11);
    for (let j = 0; j < cols; j++) {
      matrix[0][j] = 0;
      l.array2d("matrix", matrix, { r: 0, c: j }); // Changed from array to object
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Set the cell at (0, ${j}) in the first row to zero. This is part of zeroing out the entire first row because the firstRowHasZero flag was true.`;
      l.breakpoint(12);
    }
  }

  l.array2d("matrix", matrix);
  l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
  l.comment =
    "Check the firstColHasZero flag to determine if the original matrix had zeros in the first column.";
  l.breakpoint(13);

  // Zero out the first column if needed
  if (firstColHasZero) {
    l.array2d("matrix", matrix);
    l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
    l.comment =
      "The firstColHasZero flag is true, indicating that the original matrix had at least one zero in the first column. Therefore, set all elements in the first column to zero.";
    l.breakpoint(14);
    for (let i = 0; i < rows; i++) {
      matrix[i][0] = 0;
      l.array2d("matrix", matrix, { r: i, c: 0 }); // Changed from array to object
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Set the cell at (${i}, 0) in the first column to zero. This is part of zeroing out the entire first column because the firstColHasZero flag was true.`;
      l.breakpoint(15);
    }
  }

  l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
  l.array2d("result", matrix); // Ensure this logs the final state correctly
  l.comment =
    "All necessary rows and columns have been zeroed out based on the original positions of zeros. The matrix now reflects the final state where if an element was zero, its entire row and column are set to zero.";
  l.breakpoint(16);

  return l.getSteps();
}
