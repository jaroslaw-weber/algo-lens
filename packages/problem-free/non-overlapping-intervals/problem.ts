import { Problem, ProblemState } from "@algolens/core/src/types";
// Added ProblemMetadata
import { generateSteps } from "./steps";
import { EraseOverlapIntervalsInput } from "./types"; // Import input type from types.ts
import { variables } from "./variables";
import { groups } from "./groups"; // Add placeholder groups
import { testcases } from "./testcase"; // Add placeholder testcases

const title = "Non-overlapping Intervals";

export const problem: Problem<EraseOverlapIntervalsInput, ProblemState> = {
  title,
  emoji: "✂️",
  func: generateSteps,
  id: "non-overlapping-intervals",
  metadata: {
    variables,
    groups,
  }, // Add the metadata property here
  codegen: {
    signature: "eraseOverlapIntervals(intervals: number[][]): number",
  },
  testcases, // Add placeholder testcases
  difficulty: "easy", // Add placeholder difficulty
};
