import { TestCase } from "algo-lens-core";
import { PacificAtlanticInput } from "./types"; // Corrected import name

// Corrected TestCase parameterization: Input type and Expected output type
export const testcases = [
  {
    // Input is now directly the number[][] array
    input: [
      [1, 2, 2, 3, 5],
      [3, 2, 3, 4, 4],
      [2, 4, 5, 3, 1],
      [6, 7, 1, 4, 5],
      [5, 1, 1, 2, 4],
    ],
    // Expected output remains the coordinates array
    expected: [
      [0, 4],
      [1, 3],
      [1, 4],
      [2, 2],
      [3, 0],
      [3, 1],
      [4, 0],
    ],
    description: "Standard complex case",
  },
  {
    input: [[1]], // Corrected input structure
    expected: [[0, 0]],
    description: "Single cell grid",
  },
  {
    input: [ // Corrected input structure
      [1, 1],
      [1, 1],
      [1, 1],
    ],
    expected: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
      [2, 1],
    ],
    description: "All cells reachable",
  ,
    isDefault: true},
  {
    input: [ // Corrected input structure
      [1, 2],
      [4, 3],
    ],
    expected: [
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    description: "Small 2x2 grid",
  }
];
