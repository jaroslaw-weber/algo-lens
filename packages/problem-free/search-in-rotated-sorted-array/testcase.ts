import { ProblemState, TestCase } from "algo-lens-core/src/types";

import { SearchInput } from "./types";

export const testcases: TestCase<SearchInput, ProblemState>[] = [
  {
    input: [[4, 5, 6, 7, 0, 1, 2], 0],
    expected: 4,
    name: "Target Found",
    description: "Search for the target in a rotated sorted array",
  },
  {
    input: [[4, 5, 6, 7, 0, 1, 2], 3],
    expected: -1,
    name: "Target Not Found",
    description: "Search for a non-existent target in a rotated sorted array",
  },
  {
    // Changed from [3, 5, 1, 2, 4], target 1 (len 5) to a more standard example
    input: [[4, 5, 6, 7, 0, 1, 2], 0],
    expected: 4,
    name: "Default Target Found",
    description: "Search for the target in a rotated sorted array", // Updated description
    isDefault: true,
  },
  {
    input: [[1, 3], 2],
    expected: -1,
    name: "Sorted Target Not Found",
    description: "Search for a non-existent target in a sorted array",
  },
];
