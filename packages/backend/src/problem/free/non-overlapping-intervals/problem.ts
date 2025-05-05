import { Problem, ProblemState } from "algo-lens-core"; // Added ProblemMetadata
import { generateSteps } from "./steps";
import { code } from "./code/typescript";
import { EraseOverlapIntervalsInput } from "./types"; // Import input type from types.ts
import { variables } from "./variables";
import { groups } from "./groups"; // Add placeholder groups
import { testcases } from "./testcase"; // Add placeholder testcases

const title = "Non-overlapping Intervals";

export const problem: Problem<EraseOverlapIntervalsInput, ProblemState> = {
  title,
  emoji: "✂️",
  func: generateSteps,
  id: "435",
  tags: ["interval"],
  metadata: {
    variables,
    groups,
  }, // Add the metadata property here
  testcases, // Add placeholder testcases
  difficulty: "easy", // Add placeholder difficulty
};
