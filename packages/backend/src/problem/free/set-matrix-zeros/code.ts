export const code = `function setZeroes(matrix: number[][]): void {
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
