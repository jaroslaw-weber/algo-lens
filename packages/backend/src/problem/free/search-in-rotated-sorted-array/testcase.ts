import { ProblemState, TestCase } from "algo-lens-core";
import { SearchInput } from "./types";

export const testcases: TestCase<SearchInput, ProblemState> = [
  {
    nums: [13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    target: 1,
  },
  {
    nums: [4, 5, 6, 7, 0, 1, 2],
    target: 0,
  },
  {
    nums: [4, 5, 6, 7, 0, 1, 2],
    target: 3, // Target not found
  },
  {
    nums: [1],
    target: 0, // Target not found in single element array
  },
  {
    nums: [1],
    target: 1, // Target found in single element array
  },
  {
    nums: [5, 1, 3],
    target: 5, // Target is the first element
  },
  {
    nums: [5, 1, 3],
    target: 3, // Target in the right part
  },
];
