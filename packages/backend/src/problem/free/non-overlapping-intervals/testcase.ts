import { defineTestcase } from "@problem/types/testcase";
import { NonOverlappingIntervalsInput } from "./types"; // Assuming types.ts defines NonOverlappingIntervalsInput { intervals: number[][] }

export const testcases = [
  defineTestcase<NonOverlappingIntervalsInput>({
    title: "Test Case 1: One removal needed",
    input: { intervals: [[1, 2], [2, 3], [3, 4], [1, 3]] },
    output: 1, // Expected output is 1
  }),
  defineTestcase<NonOverlappingIntervalsInput>({
    title: "Test Case 2: Multiple identical intervals",
    input: { intervals: [[1, 2], [1, 2], [1, 2]] },
    output: 2, // Expected output is 2
  }),
  defineTestcase<NonOverlappingIntervalsInput>({
    title: "Test Case 3: No overlap",
    input: { intervals: [[1, 2], [2, 3]] },
    output: 0, // Expected output is 0
  }),
  defineTestcase<NonOverlappingIntervalsInput>({
    title: "Test Case 4: Complex overlap",
    input: { intervals: [[1, 100], [11, 22], [1, 11], [2, 12]] },
    output: 2, // Expected output is 2
  }),
  // Adding one more case for edge scenario: Empty input
  defineTestcase<NonOverlappingIntervalsInput>({
    title: "Test Case 5: Empty Input",
    input: { intervals: [] },
    output: 0, // Expected output is 0
  }),
];
