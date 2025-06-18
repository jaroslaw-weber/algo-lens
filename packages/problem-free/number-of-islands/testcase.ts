// Placeholder for test case definitions, if needed in the future.

import { ProblemState, TestCase } from "algo-lens-core/src/types";

import { NumIslandsInput } from "./types";

export const testcases = [
  {
    name: "No Islands",
    input: [
      ["0", "0", "0"],
      ["0", "0", "0"],
    ],
    expected: 0,
    description: "Grid with no islands",
  },
  {
    name: "Single Island",
    input: [["1"]],
    expected: 1,
    description: "Single island",
  },
  {
    name: "Default Complex Grid",
    // Changed from 3x3 grid to 4x5 grid
    input: [
      ["1", "1", "0", "0", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "1", "0", "0"],
      ["0", "0", "0", "1", "1"],
    ],
    expected: 3,
    description: "Complex grid with islands touching corners and edges",
    isDefault: true,
  },
  {
    name: "Another Complex Grid",
    input: [
      ["1", "1", "0", "0", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "1", "0", "0"],
      ["0", "0", "0", "1", "1"],
    ],
    expected: 3,
    description: "Complex grid with islands touching corners and edges",
  },
  {
    name: "Island Connected by Walls",
    input: [
      ["1", "1", "1", "1", "0"],
      ["1", "1", "0", "1", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
    ],
    expected: 1,
    description: "Grid with islands connected by walls",
  },
];
