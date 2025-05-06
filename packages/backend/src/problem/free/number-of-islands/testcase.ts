// Placeholder for test case definitions, if needed in the future.

import { ProblemState, TestCase } from "algo-lens-core";
import { NumIslandsInput } from "./types";

export const testcases = [
  {
    input: [
      ["0", "0", "0"],
      ["0", "0", "0"],
    ],
    expected: 0,
    description: "Grid with no islands",
  },
  {
    input: [["1"]],
    expected: 1,
    description: "Single island",
  },
  {
    input: [
      ["1", "0", "0"],
      ["0", "0", "0"],
      ["0", "0", "1"],
    ],
    expected: 2,
    description: "Multiple separate islands",

    isDefault: true,
  },
  {
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
