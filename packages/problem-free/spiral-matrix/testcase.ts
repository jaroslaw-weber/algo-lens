import { TestCase } from "algo-lens-core/src/types";

import { SpiralMatrixInput, SpiralMatrixOutput } from "./types";

export const testcases: TestCase<SpiralMatrixInput, SpiralMatrixOutput>[] = [
  {
    name: "5x5 Matrix 1",
    description: "A 5x5 matrix.",
    input: {
      matrix: [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
      ],
    },
    expected: [
      1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19,
      18, 17, 12, 13,
    ],
    isDefault: true,
  },
  {
    name: "6x5 Matrix",
    description: "A 6x5 matrix.",
    input: {
      matrix: [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30],
      ],
    },
    expected: [
      1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 29, 28, 27, 26, 21, 16, 11, 6, 7, 8, 9,
      14, 19, 24, 23, 22, 17, 12, 13, 18,
    ],
  },
  {
    name: "5x6 Matrix",
    description: "A 5x6 matrix.",
    input: {
      matrix: [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30],
      ],
    },
    expected: [
      1, 2, 3, 4, 5, 6, 12, 18, 24, 30, 29, 28, 27, 26, 25, 19, 13, 7, 8, 9, 10,
      11, 17, 23, 22, 21, 20, 14, 15, 16,
    ],
  },
  {
    name: "6x6 Matrix",
    description: "A 6x6 matrix.",
    input: {
      matrix: [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36],
      ],
    },
    expected: [
      1, 2, 3, 4, 5, 6, 12, 18, 24, 30, 36, 35, 34, 33, 32, 31, 25, 19, 13, 7,
      8, 9, 10, 11, 17, 23, 29, 28, 27, 26, 20, 14, 15, 16, 22, 21,
    ],
  },
  {
    name: "7x5 Matrix",
    description: "A 7x5 matrix.",
    input: {
      matrix: [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35],
      ],
    },
    expected: [
      1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 34, 33, 32, 31, 26, 21, 16, 11, 6,
      7, 8, 9, 14, 19, 24, 29, 28, 27, 22, 17, 12, 13, 18, 23,
    ],
  },
];
