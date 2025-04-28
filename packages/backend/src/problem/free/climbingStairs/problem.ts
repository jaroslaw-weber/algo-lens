import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { code } from "./code";
import { ClimbingStairsInput } from "./types";

const title = "Climbing Stairs";
const getInput = () => ({ n: 8 });

export const problem: Problem<ClimbingStairsInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: generateSteps, // Use generateSteps from steps.ts
  id: "climbing-stairs",
  tags: ["dynamic programming"],
  tested: true,
  metadata: {
    variables: variableMetadata,
    groups: groups,
  },
};
