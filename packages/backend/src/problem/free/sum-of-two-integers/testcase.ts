import { SumOfTwoIntegersInput } from "./types";

// Test Case 1: Simple positive numbers (from original getInput)
const testcase1: SumOfTwoIntegersInput = { a: 3, b: 5 }; // 8

// Test Case 2: One positive, one negative
const testcase2: SumOfTwoIntegersInput = { a: -2, b: 3 }; // 1

// Test Case 3: Both negative
const testcase3: SumOfTwoIntegersInput = { a: -1, b: -5 }; // -6

// Test Case 4: Zero involved
const testcase4: SumOfTwoIntegersInput = { a: 0, b: 7 }; // 7

// Test Case 5: Zero involved (other operand)
const testcase5: SumOfTwoIntegersInput = { a: -4, b: 0 }; // -4

// Test Case 6: Larger numbers
const testcase6: SumOfTwoIntegersInput = { a: 123, b: 456 }; // 579

// Test Case 7: Numbers resulting in carry overflow (implementation dependent)
// Example: Let's test with numbers close to integer limits if needed,
// but simple cases are usually sufficient for bitwise logic visualization.
// const testcase7: SumOfTwoIntegersInput = { a: 2147483647, b: 1 }; // Might overflow standard int

// Export the test cases
export default [
    testcase1,
    testcase2,
    testcase3,
    testcase4,
    testcase5,
    testcase6,
];
