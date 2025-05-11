import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Will import the renamed function
import { HammingWeightInput } from "./types"; // Import input type from types.ts
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

export const problem: Problem<HammingWeightInput, ProblemState> = {
  title: "Hamming Weight",
  emoji: "1️⃣",
  testcases,
  difficulty: "easy",
  func: generateSteps, // Use the renamed function
  id: "number-of-1-bits",
  tags: ["bit manipulation"],
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "hammingWeight(n: number): number",
  },
};
