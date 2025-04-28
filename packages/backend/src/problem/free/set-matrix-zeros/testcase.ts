import { SetMatrixZeroesInput } from "./types";

// Test Case 1: From original getInput
const testcase1: SetMatrixZeroesInput = {
  matrix: [
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
  ],
};

// Test Case 2: Simple 3x3 case
const testcase2: SetMatrixZeroesInput = {
  matrix: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
};

// Test Case 3: No zeros
const testcase3: SetMatrixZeroesInput = {
  matrix: [
    [1, 2, 3],
    [4, 5, 6],
  ],
};

// Test Case 4: All zeros
const testcase4: SetMatrixZeroesInput = {
  matrix: [
    [0, 0],
    [0, 0],
  ],
};

// Test Case 5: Zero in corner
const testcase5: SetMatrixZeroesInput = {
  matrix: [
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5],
  ],
};

// Test Case 6: Larger matrix
const testcase6: SetMatrixZeroesInput = {
    matrix: [
        [1, 2, 3, 4],
        [5, 0, 7, 8],
        [0, 10, 11, 12],
        [13, 14, 15, 0]
    ]
};

// Export the test cases
export default [
    testcase1,
    testcase2,
    testcase3,
    testcase4,
    testcase5,
    testcase6,
];
