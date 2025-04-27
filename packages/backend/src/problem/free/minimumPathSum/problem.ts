// Placeholder for the main problem definition
import { Problem } from "algo-lens-core";
import { MinimumPathSumParams } from "./types";
import { codeRaw } from "./code";
import { generateSteps } from "./steps";
import { variableMetadata } from "./variables";
import { variableGroups } from "./groups";

const title = "Minimum Path Sum";

const getInput = (): MinimumPathSumParams => ({
  grid: [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ],
});

export const minimumPathSumProblem: Problem<MinimumPathSumParams> = {
  id: "minimum-path-sum",
  title: title,
  codeRaw: codeRaw,
  getInput: getInput,
  generateSteps: generateSteps,
  variableMetadata: variableMetadata,
  variableGroups: variableGroups,
  tags: ["2d dynamic programming"],
};
