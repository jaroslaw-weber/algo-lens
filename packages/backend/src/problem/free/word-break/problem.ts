import { Problem } from "algo-lens-core";
import { WordBreakInput, WordBreakProblemState } from "./types"; // Assuming ProblemState might be specific later
import { wordBreak } from "./code";
import { code } from "./code/solution";
import { testcases } from "./testcases";
import { variables } from "./variables";
import { groups } from "./groups";

const title = "Word Break";

export const problem: Problem<WordBreakInput, WordBreakProblemState> = {
  title: title,
  emoji: "📖",
  func: wordBreak, // Import from code/index.ts
  id: "word-break",
  tags: ["dynamic programming", "string"],
  difficulty: "medium",
  testcases,
  metadata: {
    variables,
    groups,
  },
};
