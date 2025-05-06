import { Problem } from "algo-lens-core";
import { WordBreakInput, WordBreakProblemState } from "./types"; // Assuming ProblemState might be specific later
import { generateSteps } from "./steps"; // Import generateSteps instead of wordBreak
import { code } from "./code/solution";
import { testcases } from "./testcase"; // Corrected import path
import { variables } from "./variables";
import { groups } from "./groups";

const title = "Word Break";

export const problem: Problem<WordBreakInput, WordBreakProblemState> = {
  title: title,
  emoji: "📖",
  func: generateSteps, // Use generateSteps
  id: "word-break",
  tags: ["dynamic programming", "string"],
  difficulty: "medium",
  testcases,
  metadata: {
    variables,
    groups,
  },
};
