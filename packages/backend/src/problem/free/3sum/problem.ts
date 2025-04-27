import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { code } from "./code";
import { ThreeSumInput } from "./types";
import { testCases } from "./test-cases"; // Added import
import { runProblemTests } from "../../core/test-runner"; // Added import

export const threeSumProblem: Problem<ThreeSumInput, ProblemState> = {
  title: "Three Sum",
  code: code,
  // Removed getInput property
  func: generateSteps,
  tested: true, // Changed to true
  id: "3sum",
  tags: ["array", "hash set", "two pointers"], // Keep updated tags
  testCases: testCases, // Added testCases property
  metadata: {
    variables: variableMetadata,
    groups: groups,
  },
};
