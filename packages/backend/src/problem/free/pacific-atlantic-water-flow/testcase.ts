import { TestCase } from "algo-lens-core";
import { PacificAtlanticInput } from "./types"; // Changed import name

// Expected output is number[][] based on the coordinates structure
export const testcases: TestCase<PacificAtlanticInput, number[][]>[] = [
  {
    input: [ // Input is the array directly
      [1, 2, 2, 3, 5],
      [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
      [5, 1, 1, 2, 4],
    ],
    expected: [ // Expected is the array directly
      [0, 4],
      [1, 3],
        [1, 4],
        [2, 2],
        [3, 0],
        [3, 1],
      [4, 0],
    ],
  },
  {
    input: [[1]], // Input is the array directly
    expected: [[0, 0]], // Expected is the array directly
  },
  {
    input: [ // Input is the array directly
      [1, 1],
      [1, 1],
      [1, 1],
    ],
    expected: [ // Expected is the array directly
      [0, 0],
      [0, 1],
        [1, 0],
        [1, 1],
        [2, 0],
      [2, 1],
    ],
  },
  {
    input: [ // Input is the array directly
      [1, 2],
      [4, 3],
    ],
    expected: [ // Expected is the array directly
      [0, 1],
      [1, 0],
        [1, 1],
      ],
    },
  },
];
