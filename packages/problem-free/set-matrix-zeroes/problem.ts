import { Problem, ProblemState } from "algo-lens-core/src/types";

import { variables } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { testcases } from "./testcase";
import { SetMatrixZeroesInput } from "./types";

// Note: The output type for the Problem definition is ProblemState[],
// which represents the sequence of steps generated by generateSteps.
// The 'expected' field in testcases defines the final expected state of the primary output (the matrix).
export const problem: Problem<SetMatrixZeroesInput, ProblemState> = {
  title: "Set Matrix Zeroes",
  emoji: "0️⃣", // Keep the emoji from the original file
  func: (x) => generateSteps(x),
  testcases: testcases,
  id: "set-matrix-zeroes", // Keep the id from the original file
  tags: ["matrix"], // Keep the tags from the original file
  difficulty: "medium", // Keep the difficulty from the original file
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "setZeroes(matrix: number[][]): void",
  },
};
