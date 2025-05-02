import { Problem, ProblemState } from "algo-lens-core";
import { generateSteps } from "./steps"; // Corrected import name
import { EditDistanceInput } from "./types";
import { code } from "./code";
import { variableMetadata } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";

const title = "Edit Distance";
const getInput = (): EditDistanceInput => ({ s1: "kitten", s2: "sitting" });

export const problem: Problem<EditDistanceInput, ProblemState> = {
  title,
  id: "edit-distance",
  tags: ["dynamic programming", "string"],
  code,
  func: generateSteps, // Corrected function assignment
  getInput,
  testCases: testcases,
  metadata: {
    variableMetadata,
    groups,
  }
};
