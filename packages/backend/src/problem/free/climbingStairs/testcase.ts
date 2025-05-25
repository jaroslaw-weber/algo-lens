import { TestCase } from "algo-lens-core";

// Input type is number (n stairs), output type is number (number of ways)
export const testcases = [
  { name: "1 Stair", input: 1, expected: 1 },
  { name: "2 Stairs", input: 2, expected: 2 },
  { name: "3 Stairs", input: 3, expected: 3 },
  { name: "5 Stairs", input: 5, expected: 8 },
  { name: "8 Stairs", input: 8, expected: 34 },
  {
    name: "Default 7 Stairs",
    input: 7,
    expected: 21, // Changed from n=4 to n=7
    isDefault: true,
  },
  { name: "6 Stairs", input: 6, expected: 13 },
  // { input: 7, expected: 21 }, // Original test case for 7 moved to default
  { name: "10 Stairs", input: 10, expected: 89 },
  { name: "Large Input", input: 45, expected: 1836311903 },
];
