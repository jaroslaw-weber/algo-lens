import { TestCase } from "algo-lens-core"; // Corrected import path

export const testcases = [
  { name: "Input 4 (1 bit)", input: 4, expected: 1 },
  { name: "Input 5 (2 bits)", input: 5, expected: 2 },
  {
    name: "Default Input 13 (3 bits)",
    input: 13,
    expected: 3, // Changed from 6 to 13
    isDefault: true,
  },
  { name: "Input 7 (3 bits)", input: 7, expected: 3 },
  { name: "Input 8 (1 bit)", input: 8, expected: 1 },
];
