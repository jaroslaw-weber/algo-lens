import { defineProblem } from "@problem/types/problem";
import { generateSteps } from "./steps";
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";
import { WordBreakInput } from "./types";

export const problem = defineProblem<WordBreakInput>({
  id: "word-break", // From original file
  title: "Word Break", // From original file
  emoji: "🧩", // Updated emoji
  tags: ["Dynamic Programming", "String"], // Updated tags from original file
  difficulty: "Medium", // Default difficulty
  generateSteps: generateSteps,
  metadata: {
    variables: variables,
    groups: groups,
  },
  testcases: testcases,
});
