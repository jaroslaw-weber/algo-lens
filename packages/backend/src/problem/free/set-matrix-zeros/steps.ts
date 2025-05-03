import { StepLoggerV2, Array2DHighlight } from '@algo-lens/problem-template';
import type { SetMatrixZerosInput } from './types';
import { deepClone2DArray } from './utils'; // Import the cloning utility

export function generateSteps(p: SetMatrixZerosInput) {
  const l = new StepLoggerV2();
  // Clone the matrix to avoid modifying the original test case input
  const matrix = deepClone2DArray(p.matrix);
  const rows = matrix.length;
  // Handle cases with 0 rows or 0 columns gracefully
  if (rows === 0) {
      l.snapshot("Input matrix is empty.");
      return l.getSteps();
  }
  const cols = matrix[0].length;
   if (cols === 0) {
      l.snapshot("Input matrix has 0 columns.");
      return l.getSteps();
  }

  let firstRowHasZero = false;
  let firstColHasZero = false;

  // Initial state logging
  l.array2d('matrix', matrix);
  l.boolean('firstRowZero', firstRowHasZero);
  l.boolean('firstColZero', firstColHasZero);
  l.snapshot('Initial matrix and flags');

  // Breakpoint #1: Start. Determine if the first row or first column has any zeros initially.
  l.breakpoint(1);

  // Check first column
  for (let i = 0; i < rows; i++) {
    l.simple('r', i);
    l.simple('c', 0);
    l.array2d('matrix', matrix, [{ r: i, c: 0, label: 'Checking', color: 'info' }]);
    l.snapshot(`Checking first column at row ${i}: matrix[${i}][0] = ${matrix[i][0]}`);
    // Breakpoint #2: Check element matrix[i][0] in the first column.
    l.breakpoint(2);
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      l.boolean('firstColZero', firstColHasZero);
      l.array2d('matrix', matrix, [{ r: i, c: 0, label: 'Found 0', color: 'error' }]);
      l.snapshot(`Found 0 at matrix[${i}][0]. Setting firstColHasZero = true.`);
      // Breakpoint #3: First column needs to be zeroed later. Break check.
      l.breakpoint(3);
      break;
    }
  }
  l.snapshot('Finished checking first column.');

  // Check first row
  for (let j = 0; j < cols; j++) {
     l.simple('r', 0);
     l.simple('c', j);
     l.array2d('matrix', matrix, [{ r: 0, c: j, label: 'Checking', color: 'info' }]);
     l.snapshot(`Checking first row at col ${j}: matrix[0][${j}] = ${matrix[0][j]}`);
    // Breakpoint #4: Check element matrix[0][j] in the first row.
    l.breakpoint(4);
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      l.boolean('firstRowZero', firstRowHasZero);
      l.array2d('matrix', matrix, [{ r: 0, c: j, label: 'Found 0', color: 'error' }]);
      l.snapshot(`Found 0 at matrix[0][${j}]. Setting firstRowHasZero = true.`);
      // Breakpoint #5: First row needs to be zeroed later. Break check.
      l.breakpoint(5);
      break;
    }
  }
   l.snapshot('Finished checking first row.');

  // Breakpoint #6: Use first row and column as markers. Iterate through the rest of the matrix.
  l.breakpoint(6);
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      l.simple('r', i);
      l.simple('c', j);
      l.array2d('matrix', matrix, [{ r: i, c: j, label: 'Checking', color: 'info' }]);
      l.snapshot(`Checking matrix[${i}][${j}] = ${matrix[i][j]}`);
      // Breakpoint #7: Check element matrix[i][j].
      l.breakpoint(7);
      if (matrix[i][j] === 0) {
         const highlights: Array2DHighlight[] = [
             { r: i, c: j, label: 'is 0', color: 'error' },
             { r: i, c: 0, label: 'Marking', color: 'warning' },
             { r: 0, c: j, label: 'Marking', color: 'warning' },
         ];
         l.array2d('matrix', matrix, highlights);
         l.snapshot(`Found 0 at matrix[${i}][${j}]. Marking matrix[${i}][0] and matrix[0][${j}].`);
        // Breakpoint #8: Found a zero. Mark matrix[i][0] and matrix[0][j] as zero.
        l.breakpoint(8);
        matrix[i][0] = 0;
        matrix[0][j] = 0;
        l.array2d('matrix', matrix, highlights.map(h => ({...h, color: 'success'}))); // Show updated markers
        l.snapshot(`Markers updated: matrix[${i}][0]=${matrix[i][0]}, matrix[0][${j}]=${matrix[0][j]}`);
      }
    }
  }
  l.snapshot('Finished marking pass.');

  // Breakpoint #9: Set matrix cells (excluding first row/col) to zero based on markers.
  l.breakpoint(9);
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      l.simple('r', i);
      l.simple('c', j);
      const highlights: Array2DHighlight[] = [
          { r: i, c: j, label: 'Checking', color: 'info' },
          { r: i, c: 0, label: `Marker=${matrix[i][0]}`, color: matrix[i][0] === 0 ? 'warning' : 'neutral' },
          { r: 0, c: j, label: `Marker=${matrix[0][j]}`, color: matrix[0][j] === 0 ? 'warning' : 'neutral' },
      ];
      l.array2d('matrix', matrix, highlights);
      l.snapshot(`Checking markers for matrix[${i}][${j}]: matrix[${i}][0]=${matrix[i][0]}, matrix[0][${j}]=${matrix[0][j]}`);
      // Breakpoint #10: Check markers matrix[i][0] and matrix[0][j].
      l.breakpoint(10);
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
         l.snapshot(`Marker found. Setting matrix[${i}][${j}] to 0.`);
        // Breakpoint #11: Set element matrix[i][j] to 0.
        l.breakpoint(11);
        matrix[i][j] = 0;
        l.array2d('matrix', matrix, [{ r: i, c: j, label: 'Set to 0', color: 'success' }]);
        l.snapshot(`matrix[${i}][${j}] set to 0.`);
      }
    }
  }
  l.snapshot('Finished setting zeros based on markers.');

  // Breakpoint #12: Check if the first row needs to be zeroed.
  l.boolean('firstRowZero', firstRowHasZero);
  l.snapshot(`Checking flag: firstRowHasZero = ${firstRowHasZero}`);
  l.breakpoint(12);
  if (firstRowHasZero) {
    // Breakpoint #13: Iterate through the first row.
    l.snapshot('Zeroing out first row.');
    l.breakpoint(13);
    for (let j = 0; j < cols; j++) {
       l.simple('r', 0);
       l.simple('c', j);
       l.array2d('matrix', matrix, [{ r: 0, c: j, label: 'Setting 0', color: 'info' }]);
       l.snapshot(`Setting matrix[0][${j}] to 0.`);
      // Breakpoint #14: Set element matrix[0][j] to 0.
      l.breakpoint(14);
      matrix[0][j] = 0;
      l.array2d('matrix', matrix, [{ r: 0, c: j, label: 'Set to 0', color: 'success' }]);
    }
     l.snapshot('Finished zeroing first row.');
  }

  // Breakpoint #15: Check if the first column needs to be zeroed.
  l.boolean('firstColZero', firstColHasZero);
  l.snapshot(`Checking flag: firstColHasZero = ${firstColHasZero}`);
  l.breakpoint(15);
  if (firstColHasZero) {
    // Breakpoint #16: Iterate through the first column.
    l.snapshot('Zeroing out first column.');
    l.breakpoint(16);
    for (let i = 0; i < rows; i++) {
       l.simple('r', i);
       l.simple('c', 0);
       l.array2d('matrix', matrix, [{ r: i, c: 0, label: 'Setting 0', color: 'info' }]);
       l.snapshot(`Setting matrix[${i}][0] to 0.`);
      // Breakpoint #17: Set element matrix[i][0] to 0.
      l.breakpoint(17);
      matrix[i][0] = 0;
      l.array2d('matrix', matrix, [{ r: i, c: 0, label: 'Set to 0', color: 'success' }]);
    }
     l.snapshot('Finished zeroing first column.');
  }

  // Breakpoint #18: Matrix modification complete.
  l.array2d('matrix', matrix); // Show final matrix state
  l.snapshot('Matrix modification complete.');
  l.breakpoint(18);

  return l.getSteps();
}
