import { Problem, ProblemState } from "algo-lens-core";
import { MissingNumberInput } from "./types";
import { generateSteps } from "./steps";
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

// Define the title
const title = "Missing Number";

// Export the complete problem setup
export const problem: Problem<MissingNumberInput, ProblemState> = {
  title,
  emoji: "❓",
  id: "268",
  tags: ["math", "array"],
  func: generateSteps, // Imported from ./steps
  testcases,
  difficulty: "easy",
  metadata: {
    variables, // Imported from ./variables
    groups, // Imported from ./groups
  },
};
