import { TestCase, ProblemState } from "algo-lens-core/src/types";

import { MissingNumberInput } from "./types";

export const testcases = [
  {
    input: [3, 0, 1],
    expected: 2,
    name: "Small Array",
    description: "Example 1: Missing Number",
  },
  {
    input: [0, 1, 3],
    expected: 2,
    name: "Small Array with Zero",
    description: "Example 2: Missing Number",
  },
  {
    input: [9, 6, 4, 2, 3, 5, 7, 0, 1],
    expected: 8,
    name: "Default Large Array",
    description: "Example 3: Missing Number",

    isDefault: true,
  },
  {
    input: [0],
    expected: 1,
    name: "Single Zero",
    description: "Example 4: Missing Number",
  },
];
