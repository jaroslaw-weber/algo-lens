import { TestCase } from "algo-lens-core";

// Define test cases for Contains Duplicate (LeetCode #217)
export const testcases = [
  {
    name: "Basic Duplicate",
    description: "Array with a single duplicate number.",
    input: [1, 2, 3, 1], // Contains duplicate
    expected: true,
  },
  {
    name: "No Duplicates",
    description: "Array with no duplicate numbers.",
    input: [1, 2, 3, 4], // No duplicates
    expected: false,
  },
  {
    name: "Empty Array",
    description: "Empty array should not contain duplicates.",
    input: [], // Empty array
    expected: false,
  },
  {
    name: "All Duplicates",
    description: "Array where all elements are duplicates.",
    input: [1, 1, 1, 1], // All duplicates
    expected: true,
  },
  {
    name: "Default Medium",
    description: "Default test case with a medium-sized array and a duplicate.",
    input: [1, 2, 3, 4, 5, 6, 7, 3, 8, 9], // Changed from [1] to medium size with duplicate
    expected: true,
    isDefault: true,
  },
  {
    name: "Duplicate at End",
    description: "Array with a duplicate at the end.",
    input: [1, 3, 5, 7, 9, 1], // Duplicate at the end
    expected: true,
  },
  {
    name: "Negative Duplicate",
    description: "Array containing negative numbers with a duplicate.",
    input: [-1, -2, -3, -1], // Negative numbers with duplicate
    expected: true,
  },
  {
    name: "Duplicate Zero",
    description: "Array with a duplicate zero.",
    input: [0, 1, 2, 3, 4, 5, 0], // Duplicate zero
    expected: true,
  },
  {
    name: "Larger Numbers No Duplicates",
    description: "Array with larger numbers and no duplicates.",
    input: [100, 200, 300, 400], // Larger numbers, no duplicates
    expected: false,
  },
];
