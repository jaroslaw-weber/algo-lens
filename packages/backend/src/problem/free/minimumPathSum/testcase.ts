import { defineTestcase } from "@problem/types/testcase";
import { MinimumPathSumInput } from "./types"; // Assuming types.ts defines MinimumPathSumInput { grid: number[][] }

export const testcases = [
  defineTestcase<MinimumPathSumInput>({
    title: "Test Case 1: 3x3 Grid",
    input: { grid: [[1, 3, 1], [1, 5, 1], [4, 2, 1]] },
    output: 7, // Expected output is 7
  }),
  defineTestcase<MinimumPathSumInput>({
    title: "Test Case 2: 2x3 Grid",
    input: { grid: [[1, 2, 3], [4, 5, 6]] },
    output: 12, // Expected output is 12
  }),
  defineTestcase<MinimumPathSumInput>({
    title: "Test Case 3: 1x1 Grid",
    input: { grid: [[1]] },
    output: 1, // Expected output is 1
  }),
  defineTestcase<MinimumPathSumInput>({
    title: "Test Case 4: 2x2 Grid",
    input: { grid: [[1, 2], [1, 1]] },
    output: 3, // Expected output is 3 (1 -> 1 -> 1)
  }),
];
