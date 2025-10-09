import { ProblemState, TestCase } from "@algolens/core/src/types";
import { UniquePathsInput } from "./types";

// The expected output type needs to be determined. The function returns ProblemState[],
// but the actual result is the final number. Let's assume the test case checks the final result number.
// If the framework requires checking the ProblemState[], this needs adjustment.
export const testcases: TestCase<UniquePathsInput, ProblemState>[] = [
  {
    name: "3x7 Grid Paths",
    description: "Calculates unique paths for a 3x7 grid.",
    input: { m: 3, n: 7 },
    expected: 28, // Calculated as C(3+7-2, 3-1) = C(8, 2) = 28
  },
  {
    name: "1x1 Grid Base Case",
    description: "Calculates unique paths for a 1x1 grid (base case).",
    input: { m: 1, n: 1 },
    expected: 1,
  },
  {
    name: "Default 3x7 Grid Paths",
    description: "Default test case: calculates unique paths for a 3x7 grid.",
    // Changed from m=2, n=2 (very small) to m=3, n=7
    input: { m: 3, n: 7 },
    expected: 28, // Calculated as C(3+7-2, 3-1) = C(8, 2) = 28
    isDefault: true,
  },
  {
    name: "3x2 Grid Paths",
    description: "Calculates unique paths for a 3x2 grid.",
    input: { m: 3, n: 2 },
    expected: 3, // C(3+2-2, 3-1) = C(3, 2) = 3
  },
];
