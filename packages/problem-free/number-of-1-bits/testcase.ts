import { TestCase } from "@algolens/core/src/types";
// Corrected import path

export const testcases = [
  {
    name: "Input 4 (1 bit)",
    description: "Tests a number with a single '1' bit.",
    input: 4,
    expected: 1,
  },
  {
    name: "Input 5 (2 bits)",
    description: "Tests a number with two '1' bits.",
    input: 5,
    expected: 2,
  },
  {
    name: "Default Input 13 (3 bits)",
    description: "Default test case: Tests a number with three '1' bits.",
    input: 13,
    expected: 3, // Changed from 6 to 13
    isDefault: true,
  },
  {
    name: "Input 7 (3 bits)",
    description: "Tests another number with three '1' bits.",
    input: 7,
    expected: 3,
  },
  {
    name: "Input 8 (1 bit)",
    description: "Tests a power of two, which has a single '1' bit.",
    input: 8,
    expected: 1,
  },
];
