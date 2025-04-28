import { ProductExceptSelfInput } from "./types";

// Define a basic test case using the default input structure
const testcase1: ProductExceptSelfInput = {
  nums: [1, 2, 3, 4],
};

// Define another test case with different values
const testcase2: ProductExceptSelfInput = {
  nums: [-1, 1, 0, -3, 3],
};

// Export the test cases
export default [testcase1, testcase2];
