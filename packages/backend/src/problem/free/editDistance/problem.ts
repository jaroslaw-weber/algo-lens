import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Corrected import name
import { EditDistanceInput } from "./types";
import { groups } from "./groups";
import { variables } from "./variables";
import { testcases } from "./testcase";

const title = "Edit Distance";

export const problem: Problem<EditDistanceInput, ProblemState> = {
  title,
  emoji: "✍️", // Updated emoji
  id: "72", // Updated id
  tags: ["dynamic programming", "string"],
  func: (input) => generateSteps(...input), // Corrected function assignment
  testcases, // Added testcases property
  metadata: {
    variables,
    groups,
  },
};
