import { TestCase } from "algo-lens-core";
import { UniquePathsInput } from "./types";

// The expected output type needs to be determined. The function returns ProblemState[],
// but the actual result is the final number. Let's assume the test case checks the final result number.
// If the framework requires checking the ProblemState[], this needs adjustment.
export const testcases = [
  {
    input: { m: 3, n: 7 },
    expected: 28, // Calculated as C(3+7-2, 3-1) = C(8, 2) = 28
  },
  {
    input: { m: 1, n: 1 },
    expected: 1,
  },
  {
    input: { m: 2, n: 2 },
    expected: 2, // C(2+2-2, 2-1) = C(2, 1) = 2
  ,
    isDefault: true},
  {
    input: { m: 3, n: 2 },
    expected: 3, // C(3+2-2, 3-1) = C(3, 2) = 3
  }
];
