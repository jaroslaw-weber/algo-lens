import { setMatrixZeroesProblem } from "./problem";
import testcases from "./testcase";
import { deepClone2DArray } from "../../core/utils"; // Need clone for solution

// Simple reference solution (can be moved to solution.ts)
function solution(matrix: number[][]): number[][] {
    const clonedMatrix = deepClone2DArray(matrix); // Operate on a clone
    const R = clonedMatrix.length;
    const C = clonedMatrix[0].length;
    let isCol = false;

    for (let i = 0; i < R; i++) {
        if (clonedMatrix[i][0] === 0) {
            isCol = true;
        }
        for (let j = 1; j < C; j++) {
            if (clonedMatrix[i][j] === 0) {
                clonedMatrix[0][j] = 0;
                clonedMatrix[i][0] = 0;
            }
        }
    }

    for (let i = 1; i < R; i++) {
        for (let j = 1; j < C; j++) {
            if (clonedMatrix[i][0] === 0 || clonedMatrix[0][j] === 0) {
                clonedMatrix[i][j] = 0;
            }
        }
    }

    if (clonedMatrix[0][0] === 0) {
        for (let j = 0; j < C; j++) {
            clonedMatrix[0][j] = 0;
        }
    }

    if (isCol) {
        for (let i = 0; i < R; i++) {
            clonedMatrix[i][0] = 0;
        }
    }
    return clonedMatrix;
}


describe("Set Matrix Zeroes", () => {
  // Test the visualizer function (steps generation)
  it("should generate steps for test cases", () => {
    testcases.forEach((testcase) => {
      // Clone input for the steps function as it modifies the matrix internally
      const inputClone = { matrix: deepClone2DArray(testcase.matrix) };
      const steps = setMatrixZeroesProblem.func(inputClone);
      expect(steps).toBeInstanceOf(Array);
      expect(steps.length).toBeGreaterThan(0);
    });
  });

  // Test the example code string (optional)
  it("should have valid example code", () => {
    expect(setMatrixZeroesProblem.code).toBeTruthy();
  });

  // Test the getInput function
  it("should return a valid input object", () => {
    const input = setMatrixZeroesProblem.getInput();
    expect(input).toHaveProperty("matrix");
    expect(input.matrix).toBeInstanceOf(Array);
    expect(input.matrix[0]).toBeInstanceOf(Array); // Check if it's a 2D array
  });

  // Test the final state of the matrix in the steps against the reference solution
  it("should have the final matrix state matching the reference solution", () => {
     testcases.forEach(testcase => {
       const expectedMatrix = solution(testcase.matrix); // Get expected result
       // Clone input for the steps function as it modifies the matrix internally
       const inputClone = { matrix: deepClone2DArray(testcase.matrix) };
       const steps = setMatrixZeroesProblem.func(inputClone);
       const lastStep = steps[steps.length - 1];

       expect(lastStep).toBeDefined();

       // Find the 'matrix' variable in the last step
       const matrixVariable = lastStep.variables.find(v => v.id === 'matrix');
       expect(matrixVariable).toBeDefined();

       // Check the value stored in the matrix variable
       // Adjust 'meta.value' based on the actual structure from as2dArray
       expect(matrixVariable?.meta?.value).toEqual(expectedMatrix);
     });
   });
});
