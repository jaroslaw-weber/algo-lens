import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { code } from "./code";
import { ThreeSumInput } from "./types";

export const threeSumProblem: Problem<ThreeSumInput, ProblemState> = {
  title: "Three Sum",
  code: code,
  getInput: () => ({
    nums: [-1, 0, 1, 2, -1, -4, 4, 3, -3, 0],
  }),
  func: generateSteps,
  tested: false, // Mark as untested for now
  id: "3sum",
  tags: ["array", "hash set", "two pointers"], // Keep updated tags
  metadata: {
    variables: variableMetadata,
    groups: groups,
  },
};
