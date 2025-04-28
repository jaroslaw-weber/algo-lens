import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { code } from "./code";
import { ClimbingStairsInput } from "./types";
import { climbingStairsTestCases } from './testcase';

const title = "Climbing Stairs";

export const problem: Problem<ClimbingStairsInput, ProblemState> = {
  title: title,
  code: code,
  func: generateSteps, // Use generateSteps from steps.ts
  testCases: climbingStairsTestCases,
  id: "climbing-stairs",
  tags: ["dynamic programming"],
  metadata: {
    variables: variableMetadata,
    groups: groups,
  },
};
