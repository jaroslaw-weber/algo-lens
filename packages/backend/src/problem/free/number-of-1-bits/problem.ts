import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Will import the renamed function
import { HammingWeightInput } from "./types"; // Import input type from types.ts
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

const title = "Hamming Weight";
const getInput = () => ({ n: 9 });

export const problem: Problem<HammingWeightInput, ProblemState> = {
  title,
  emoji: "1️⃣",
  testcases,
  difficulty: "easy",
  func: generateSteps, // Use the renamed function
  id: "hamming-weight", // Note: id in original file was hamming-weight, but file is number-of-1-bits. Using original id.
  tags: ["bit manipulation"],
  metadata: {
    variables,
    groups,
  },
};
