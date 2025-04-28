import { SearchInput } from "./types";

// Test Case 1: Target in the right rotated part (from original getInput)
const testcase1: SearchInput = {
  nums: [13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  target: 1,
};

// Test Case 2: Target in the left part
const testcase2: SearchInput = {
  nums: [4, 5, 6, 7, 0, 1, 2],
  target: 5,
};

// Test Case 3: Target not found
const testcase3: SearchInput = {
  nums: [4, 5, 6, 7, 0, 1, 2],
  target: 3,
};

// Test Case 4: Target is the first element
const testcase4: SearchInput = {
  nums: [5, 1, 3],
  target: 5,
};

// Test Case 5: Target is the last element
const testcase5: SearchInput = {
    nums: [5, 1, 3],
    target: 3
};

// Test Case 6: Single element array, target found
const testcase6: SearchInput = {
    nums: [1],
    target: 1
};

// Test Case 7: Single element array, target not found
const testcase7: SearchInput = {
    nums: [1],
    target: 0
};

// Test Case 8: Two elements, target first
const testcase8: SearchInput = {
    nums: [3, 1],
    target: 3
};

// Test Case 9: Two elements, target second
const testcase9: SearchInput = {
    nums: [3, 1],
    target: 1
};


// Export the test cases
export default [
    testcase1,
    testcase2,
    testcase3,
    testcase4,
    testcase5,
    testcase6,
    testcase7,
    testcase8,
    testcase9,
];
