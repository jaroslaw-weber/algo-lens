import { Problem, ProblemState } from "@algolens/core/src/types";

import { WordBreakInput } from "./types"; // Assuming ProblemState might be specific later
import { generateSteps } from "./steps"; // Import generateSteps instead of wordBreak
import { code } from "./code/solution";
import { testcases } from "./testcase"; // Corrected import path
import { variables } from "./variables";
import { groups } from "./groups";

const title = "Word Break";

export const problem: Problem<WordBreakInput, ProblemState> = {
  title: title,
  emoji: "📖",
  func: generateSteps, // Use generateSteps
  id: "word-break",
  codegen: {
    // Added codegen property
    signature: "wordBreak(s: string, wordDict: string[]): boolean", // Added signature
  },
  difficulty: "medium",
  testcases,
  metadata: {
    variables,
    groups,
  },
};
