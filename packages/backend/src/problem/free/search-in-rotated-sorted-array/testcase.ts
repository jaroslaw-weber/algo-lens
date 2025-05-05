import { ProblemState, TestCase } from "algo-lens-core";
import { SearchInput } from "./types";

export const testcases: TestCase<SearchInput, ProblemState>[] = [
  {
    input: [[4, 5, 6, 7, 0, 1, 2], 0],
    expected: 4,
    description: "Search for the target in a rotated sorted array",
  },
  {
    input: [[4, 5, 6, 7, 0, 1, 2], 3],
    expected: -1,
    description: "Search for a non-existent target in a rotated sorted array",
  },
  {
    input: [[3, 5, 1, 2, 4], 1],
    expected: 2,
    description:
      "Search for the target in a rotated sorted array with duplicate elements",
  },
  {
    input: [[1, 3], 2],
    expected: -1,
    description: "Search for a non-existent target in a sorted array",
  },
];
