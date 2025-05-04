import { defineTestcase } from "@problem/types/testcase";
import { SearchRotatedInput } from "./types"; // Assuming types.ts defines this

export const testcases = [
  defineTestcase<SearchRotatedInput>({
    title: "Test Case 1: Target in rotated part",
    input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
    output: 4,
  }),
  defineTestcase<SearchRotatedInput>({
    title: "Test Case 2: Target not found",
    input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 },
    output: -1,
  }),
  defineTestcase<SearchRotatedInput>({
    title: "Test Case 3: Single element, not found",
    input: { nums: [1], target: 0 },
    output: -1,
  }),
   defineTestcase<SearchRotatedInput>({
    title: "Test Case 4: Single element, found",
    input: { nums: [1], target: 1 },
    output: 0,
  }),
  defineTestcase<SearchRotatedInput>({
    title: "Test Case 5: Rotated with target at start",
    input: { nums: [5, 1, 3], target: 5 },
    output: 0,
  }),
   defineTestcase<SearchRotatedInput>({
    title: "Test Case 6: Rotated with target in middle",
    input: { nums: [5, 1, 3], target: 3 },
    output: 2,
  }),
];
