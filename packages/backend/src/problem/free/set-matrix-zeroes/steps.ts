import { ProblemState, Pointer2D } from "algo-lens-core";
import { StepLoggerV2 } from "../../core/StepLoggerV2";
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
  l.grid("matrix", matrix);
  l.simple({ rows, cols });
  l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
  l.comment =
    "Initialize the state with the input matrix, its dimensions (rows and cols), and two boolean flags (firstRowHasZero and firstColHasZero) to track if the first row or first column originally contained any zeros. These flags are initially false.";
  l.breakpoint(1);

  // Determine if the first column has any zeros
  for (let i = 0; i < rows; i++) {
    l.grid("matrix", matrix, { r: i, c: 0 }); // Changed from array to object
    l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
    l.comment = `Check if any element in the first column is zero. This is done by iterating through each row.`;
    l.breakpoint(2);

    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      l.grid("matrix", matrix, { r: i, c: 0 }); // Changed from array to object
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Found a zero in the first column. Set the 'firstColHasZero' flag to true.`;
      l.breakpoint(3);
      break;
    }
  }

  // Determine if the first row has any zeros
  for (let j = 0; j < cols; j++) {
    // HIDE_START
    l.grid("matrix", matrix, {
      r: 0,
      c: j,
      color: "neutral",
      label: "checking",
    });
    // HIDE_END
    l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
    l.comment = `Check if any element in the first row is zero. This is done by iterating through each column.`;
    l.breakpoint(4);

    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      // HIDE_START
      l.grid("matrix", matrix, {
        r: 0,
        c: j,
        color: "success",
        label: "found zero",
      });

      // HIDE_END
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Found a zero in the first row. Set the 'firstRowHasZero' flag to true.`;
      l.breakpoint(5);
      break;
    }
  }

  // Use first row and column as markers
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      l.grid("matrix", matrix, {
        r: i,
        c: j,
        color: "neutral",
        label: "current",
      });
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Iterate through the matrix starting from the second row and second column. For the current cell, check if its value is zero.`;
      l.breakpoint(6);

      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
        // Highlight the cell and the markers
        // HIDE_START
        const pointers: Pointer2D[] = [
          { r: i, c: j, label: "current", color: "success" },
          { r: i, c: 0, label: "marker", color: "primary" },
          { r: 0, c: j, label: "marker", color: "primary" },
        ];
        // HIDE_END
        l.grid("matrix", matrix, ...pointers);
        l.simple({ rows, cols, i, j });
        l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
        l.comment = `Found a zero at the current cell. Mark the corresponding cell in the first row and first column by setting their values to zero. These will act as markers to zero out the entire row and column later.`;
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
        { r: i, c: j, label: "checking", color: "neutral" },
        { r: i, c: 0, label: "marker", color: "primary" },
        { r: 0, c: j, label: "marker", color: "primary" },
      ];
      // HIDE_END
      l.grid("matrix", matrix, ...pointers);
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Apply markers: Check the current cell using the markers in the first row and first column. If either the marker in the first row or the first column is zero, it means the current cell should be set to zero.`;
      l.breakpoint(8);

      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
        const updatedPointers: Pointer2D[] = [
          { r: i, c: j, label: "zeroed", color: "primary" },
          { r: i, c: 0, label: "marker", color: "primary" },
          { r: 0, c: j, label: "marker", color: "primary" },
        ];
        l.grid("matrix", matrix, ...updatedPointers); // Show updated matrix with the same pointers
        l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
        l.comment = `Apply markers: Set the current cell to zero because either the marker in the first row or the first column was zero.`;
        l.breakpoint(9);
      }
    }
  }

  l.grid("matrix", matrix);
  l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
  l.comment =
    "After using the first row and column as markers to zero out the rest of the matrix, now check the firstRowHasZero and firstColHasZero flags to determine if the original matrix had zeros in the first row or column.";
  l.breakpoint(10);

  // Zero out the first row if needed
  if (firstRowHasZero) {
    l.grid("matrix", matrix);
    l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
    l.comment =
      "The firstRowHasZero flag is true, indicating that the original matrix had at least one zero in the first row. Therefore, set all elements in the first row to zero.";
    l.breakpoint(11);
    for (let j = 0; j < cols; j++) {
      matrix[0][j] = 0;
      l.grid("matrix", matrix, {
        r: 0,
        c: j,
        color: "primary",
        label: "zeroing",
      });
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Set the current cell in the first row to zero. This is part of zeroing out the entire first row because the 'firstRowHasZero' flag was true, indicating that the original matrix had a zero in the first row.`;
      l.breakpoint(12);
    }
  }

  l.grid("matrix", matrix);
  l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
  l.comment =
    "Check the firstColHasZero flag to determine if the original matrix had zeros in the first column.";
  l.breakpoint(13);

  // Zero out the first column if needed
  if (firstColHasZero) {
    l.grid("matrix", matrix);
    l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
    l.comment =
      "The firstColHasZero flag is true, indicating that the original matrix had at least one zero in the first column. Therefore, set all elements in the first column to zero.";
    l.breakpoint(14);
    for (let i = 0; i < rows; i++) {
      matrix[i][0] = 0;
      l.grid("matrix", matrix, {
        r: i,
        c: 0,
        color: "primary",
        label: "zeroing",
      });
      l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
      l.comment = `Set the current cell in the first column to zero. This is part of zeroing out the entire first column because the 'firstColHasZero' flag was true, indicating that the original matrix had a zero in the first column.`;
      l.breakpoint(15);
    }
  }

  l.group("zeroFlags", { firstRowHasZero, firstColHasZero });
  l.grid("result", matrix); // Ensure this logs the final state correctly
  l.comment =
    "All necessary rows and columns have been zeroed out based on the original positions of zeros. The matrix now reflects the final state where if an element was zero, its entire row and column are set to zero.";
  l.breakpoint(16);

  return l.getSteps();
}
