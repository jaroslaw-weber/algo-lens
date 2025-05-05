/**
 * Modifies the matrix in-place such that if an element is 0,
 * its entire row and column are set to 0.
 */
export function setMatrixZeroes(matrix: number[][]): void {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let firstRowHasZero = false;
  let firstColHasZero = false;
  //#1 Initialize dimensions and flags for first row/col

  // Check if the first row has any zeros
  for (let j = 0; j < cols; j++) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      //#2 Found zero in first row
      break;
    }
  }

  // Check if the first column has any zeros
  for (let i = 0; i < rows; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      //#3 Found zero in first column
      break;
    }
  }

  // Use the first row and column to mark zero rows/columns
  // Start from (1, 1) to avoid overwriting first row/col markers yet
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (matrix[i][j] === 0) {
        matrix[0][j] = 0; // Mark column j
        matrix[i][0] = 0; // Mark row i
        //#4 Marked first row/col for matrix[i][j] == 0
      }
    }
  }

  // Set matrix cells to zero based on marks in the first row and column
  // Start from (1, 1)
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
        //#5 Set matrix[i][j] to zero based on markers
      }
    }
  }

  // Set the first row to zero if needed
  if (firstRowHasZero) {
    for (let j = 0; j < cols; j++) {
      matrix[0][j] = 0;
      //#6 Setting first row to zero
    }
  }

  // Set the first column to zero if needed
  if (firstColHasZero) {
    for (let i = 0; i < rows; i++) {
      matrix[i][0] = 0;
      //#7 Setting first column to zero
    }
  }
  //#8 Matrix zeroing complete
  // No return value as the matrix is modified in-place.
}
