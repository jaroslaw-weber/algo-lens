import { TestCase, ProblemState } from "@algolens/core/src/types";

import { MaximumSubarrayInput } from "./types";

export const testcases = [
  {
    name: "Mixed Numbers",
    input: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    expected: 6,
    description: "Mixed positive and negative numbers",
  },
  {
    name: "All Positive",
    input: [1, 2, 3, 4],
    expected: 10,
    description: "All positive numbers",
  },
  {
    // Changed from [-1, -2, -3, -4] (all negative edge case)
    name: "Default Mixed",
    input: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    expected: 6,
    description: "Mixed positive and negative numbers",
    isDefault: true,
  },
  {
    name: "Single Element",
    input: [5],
    expected: 5,
    description: "Single element array",
  },
];
