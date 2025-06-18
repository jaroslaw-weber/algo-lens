import { Problem } from "algo-lens-core/src/types";
import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { variables } from "./variables";
import { groups } from "./groups";
import { ValidAnagramInput, ValidAnagramOutput } from "./types";

export const problem: Problem<ValidAnagramInput, ValidAnagramOutput> = {
  id: "valid-anagram",
  title: "Valid Anagram",
  emoji: "🔤",
  difficulty: "easy",
  tags: ["String", "Hash Map", "Sorting"],
  func: generateSteps,
  testcases,
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "isAnagram(s: string, t: string): boolean",
  },
};
