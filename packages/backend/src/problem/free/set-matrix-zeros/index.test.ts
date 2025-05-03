import { testCases } from './testcase';
import { setMatrixZerosProblem } from './problem';
import { StepLoggerV2 } from '@algo-lens/problem-template';
import { Problem } from 'algo-lens-core';
import { SetMatrixZerosInput } from './types'; // Import input type
import { deepClone2DArray } from './utils'; // Import clone utility

describe('Set Matrix Zeroes Problem', () => {
  // Test the step generation logic
  testCases.forEach(({ input, output: expectedOutput }, index) => {
    it(`should generate correct steps and final matrix state for test case ${index + 1}`, () => {
      const steps = setMatrixZerosProblem.generateSteps(input);
      expect(steps).toBeDefined();
      expect(steps.length).toBeGreaterThan(0); // Basic check

      // Check the final state of the matrix in the steps' variables
      const lastStep = steps[steps.length - 1];
      // Assuming the final matrix state is stored in a variable named 'matrix'
      const finalMatrixVar = lastStep.variables.find(v => v.name === 'matrix');
      expect(finalMatrixVar).toBeDefined();
      expect(finalMatrixVar?.type).toBe('ARRAY_2D');
      if(finalMatrixVar?.type === 'ARRAY_2D') {
         // Deep comparison of 2D arrays
         expect(finalMatrixVar.value).toEqual(expectedOutput);
      }
    });
  });

  // Optional: Test basic problem metadata
  it('should have correct problem metadata', () => {
    expect(setMatrixZerosProblem.id).toBe('set-matrix-zeroes');
    expect(setMatrixZerosProblem.title).toBe('Set Matrix Zeroes');
    expect(setMatrixZerosProblem.tags).toEqual(["Array", "Hash Table", "Matrix"]);
  });

  // Test the reference solution logic directly (simulating generateSteps)
  testCases.forEach(({ input, output: expectedOutput }, index) => {
      it(`reference solution logic should return correct output for test case ${index + 1}`, () => {
          // Clone the input matrix to simulate in-place modification without affecting other tests
          const matrix = deepClone2DArray(input.matrix);
          const rows = matrix.length;
          const cols = matrix[0].length;
          let firstRowHasZero = false;
          let firstColHasZero = false;

          // Check first col
          for (let i = 0; i < rows; i++) {
            if (matrix[i][0] === 0) {
              firstColHasZero = true;
              break;
            }
          }

          // Check first row
          for (let j = 0; j < cols; j++) {
            if (matrix[0][j] === 0) {
              firstRowHasZero = true;
              break;
            }
          }

          // Mark first row/col for other zeros
          for (let i = 1; i < rows; i++) {
            for (let j = 1; j < cols; j++) {
              if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
              }
            }
          }

          // Set zeros based on marks
          for (let i = 1; i < rows; i++) {
            for (let j = 1; j < cols; j++) {
              if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
              }
            }
          }

          // Set first row
          if (firstRowHasZero) {
            for (let j = 0; j < cols; j++) {
              matrix[0][j] = 0;
            }
          }

          // Set first col
          if (firstColHasZero) {
            for (let i = 0; i < rows; i++) {
              matrix[i][0] = 0;
            }
          }

          // Deep comparison
          expect(matrix).toEqual(expectedOutput);
      });
  });

});
