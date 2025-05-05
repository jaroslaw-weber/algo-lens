import { TestCase } from "algo-lens-core";
import { PacificAtlanticWaterFlowInput } from "./types";

export const testcases: TestCase<PacificAtlanticWaterFlowInput>[] = [
  {
    input: {
      heights: [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4],
      ],
    },
    expected: {
      coordinates: [
        [0, 4],
        [1, 3],
        [1, 4],
        [2, 2],
        [3, 0],
        [3, 1],
        [4, 0],
      ],
    },
  },
  {
    input: { heights: [[1]] },
    expected: { coordinates: [[0, 0]] },
  },
  {
    input: {
      heights: [
        [1, 1],
        [1, 1],
        [1, 1],
      ],
    },
    expected: {
      coordinates: [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
        [2, 0],
        [2, 1],
      ],
    },
  },
  {
    input: {
      heights: [
        [1, 2],
        [4, 3],
      ],
    },
    expected: {
      coordinates: [
        [0, 1],
        [1, 0],
        [1, 1],
      ],
    },
  },
];
