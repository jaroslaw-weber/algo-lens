import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Will import the renamed function
import { code } from "./code";
import { HammingWeightInput } from "./types"; // Import input type from types.ts
import { testcases } from "./testcase";

const title = "Hamming Weight";
const getInput = () => ({ n: 9 });

export const problem: Problem<HammingWeightInput, ProblemState> = {
  title,
  code,
  getInput,
  func: generateSteps, // Use the renamed function
  id: "hamming-weight", // Note: id in original file was hamming-weight, but file is number-of-1-bits. Using original id.
  testCases: testcases,
  tags: ["bit manipulation"],
};
