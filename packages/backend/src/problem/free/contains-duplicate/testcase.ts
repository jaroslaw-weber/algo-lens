import { TestCase } from "algo-lens-core";

// Define test cases for Contains Duplicate (LeetCode #217)
export const testcases = [
  {
    name: "Basic Duplicate",
    input: [1, 2, 3, 1], // Contains duplicate
    expected: true,
  },
  {
    name: "No Duplicates",
    input: [1, 2, 3, 4], // No duplicates
    expected: false,
  },
  {
    name: "Empty Array",
    input: [], // Empty array
    expected: false,
  },
  {
    name: "All Duplicates",
    input: [1, 1, 1, 1], // All duplicates
    expected: true,
  },
  {
    name: "Default Medium",
    input: [1, 2, 3, 4, 5, 6, 7, 3, 8, 9], // Changed from [1] to medium size with duplicate
    expected: true,
    isDefault: true,
  },
  {
    name: "Duplicate at End",
    input: [1, 3, 5, 7, 9, 1], // Duplicate at the end
    expected: true,
  },
  {
    name: "Negative Duplicate",
    input: [-1, -2, -3, -1], // Negative numbers with duplicate
    expected: true,
  },
  {
    name: "Duplicate Zero",
    input: [0, 1, 2, 3, 4, 5, 0], // Duplicate zero
    expected: true,
  },
  {
    name: "Larger Numbers No Duplicates",
    input: [100, 200, 300, 400], // Larger numbers, no duplicates
    expected: false,
  },
];
