import { Problem, ProblemState } from "algo-lens-core/src/types";

import fs from "fs"; // Add import
import path from "path"; // Add import
import { variables } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { testcases } from "./testcase";
import { ThreeSumInput } from "./types";

// Read explanation markdown
const explanationMarkdown = fs.readFileSync(
  path.join(__dirname, "explanation.md"),
  "utf-8"
);

export const problem: Problem<ThreeSumInput, ProblemState> = {
  title: "Three Sum",
  emoji: "🔢",
  func: generateSteps,
  testcases: testcases,
  difficulty: "medium",
  id: "3sum",
  tags: ["array", "hash set", "two pointers"],
  explanation: explanationMarkdown, // Add explanation field
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "threeSteps(numbers: number[])",
  },
};
