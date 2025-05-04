import { defineTestcase } from "@problem/types/testcase";
import { PacificAtlanticInput } from "./types"; // Assuming types.ts defines PacificAtlanticInput { heights: number[][] }

// Helper function to sort coordinates for consistent comparison
const sortCoordinates = (coords: number[][]): number[][] => {
  return coords.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0]; // Sort by row first
    }
    return a[1] - b[1]; // Then sort by column
  });
};

export const testcases = [
  defineTestcase<PacificAtlanticInput, number[][]>({ // Explicitly defining output type as number[][]
    title: "Test Case 1: Example 1",
    input: { heights: [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]] },
    // Ensure the output is sorted by row, then column
    output: sortCoordinates([[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]),
  }),
  defineTestcase<PacificAtlanticInput, number[][]>({
    title: "Test Case 2: Single Cell",
    input: { heights: [[1]] },
    output: sortCoordinates([[0, 0]]),
  }),
  defineTestcase<PacificAtlanticInput, number[][]>({
    title: "Test Case 3: All Cells Reachable (Flat)",
    input: { heights: [[1, 1], [1, 1]] },
    output: sortCoordinates([[0, 0], [0, 1], [1, 0], [1, 1]]),
  }),
  defineTestcase<PacificAtlanticInput, number[][]>({
    title: "Test Case 4: All Cells Reachable (Varied)",
    input: { heights: [[2, 1], [1, 2]] },
    output: sortCoordinates([[0, 0], [0, 1], [1, 0], [1, 1]]),
  }),
   // Adding one more case for edge scenario: Empty input
  defineTestcase<PacificAtlanticInput, number[][]>({
    title: "Test Case 5: Empty Input",
    input: { heights: [] },
    output: [], // Expected output is empty array
  }),
];
