import { Problem, ProblemState } from "algo-lens-core/src/types";

import { generateSteps } from "./steps"; // Corrected import name
import { EditDistanceInput } from "./types";
import { groups } from "./groups";
import { variables } from "./variables";
import { testcases } from "./testcase";

const title = "Edit Distance";

export const problem: Problem<EditDistanceInput, ProblemState> = {
  title,
  emoji: "✍️", // Updated emoji
  id: "editDistance", // Updated id
  difficulty: "medium",
  tags: ["dynamic programming", "string"],
  func: (input) => generateSteps(...input), // Corrected function assignment
  codegen: { // Added codegen property
    signature: "minDistance(word1: string, word2: string): number", // Added signature
  },
  testcases, // Added testcases property
  metadata: {
    variables,
    groups,
  },
};
