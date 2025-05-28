import { Problem } from "../../../algo-lens-core/types/core";
import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";
import { explanation } from "./explanation.md";
import { MinimumWindowSubstringTypes } from "./types";

export const minimumWindowSubstring: Problem<MinimumWindowSubstringTypes> = {
  id: "minimum-window-substring",
  title: "Minimum Window Substring",
  emoji: "🪟",
  difficulty: "Hard",
  tags: ["String", "Hash Map", "Sliding Window"],
  generateSteps,
  testcases,
  explanation,
  variables,
  groups,
  codeGenerationSignature: {
    signature: "function minWindow(s: string, t: string): string",
    name: "minWindow",
  },
};
