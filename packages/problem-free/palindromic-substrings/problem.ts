import { Problem, ProblemState } from "algo-lens-core/src/types";

import fs from "fs";
import path from "path";
import { variables } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { testcases } from "./testcase";
import { PalindromicSubstringsInput } from "./types";

// Read explanation markdown
const explanationMarkdown = fs.readFileSync(
  path.join(__dirname, "explanation.md"),
  "utf-8"
);

export const problem: Problem<PalindromicSubstringsInput, ProblemState> = {
  title: "Palindromic Substrings",
  emoji: "📝",
  func: generateSteps,
  testcases: testcases,
  difficulty: "medium",
  id: "palindromic-substrings",
  tags: ["string", "dynamic programming"],
  explanation: explanationMarkdown,
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "countSubstrings(s: string)",
  },
};
