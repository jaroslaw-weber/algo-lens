import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";

import { ThreeSumInput } from "./types";
import { testcases } from "./testcase";

export const problem: Problem<ThreeSumInput, ProblemState> = {
  title: "Three Sum",
  emoji: "🔢",
  func: generateSteps,
  testcases: testcases, // Add the test cases here
  id: "3sum",
  tags: ["array", "hash set", "two pointers"], // Keep updated tags
  metadata: {
    variables: variableMetadata,
    groups: groups,
  },
};
