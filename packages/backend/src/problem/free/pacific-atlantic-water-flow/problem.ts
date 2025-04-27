// Placeholder for the main problem definition
import { Problem } from "algo-lens-core";
import { PacificAtlanticWaterFlowParams } from "./types";
import { codeRaw } from "./code";
import { generateSteps } from "./steps";
import { variableMetadata } from "./variables";
import { variableGroups } from "./groups";

const title = "Pacific Atlantic Water Flow";

const getInput = (): PacificAtlanticWaterFlowParams => ({
  heights: [
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4],
  ],
});

export const pacificAtlanticWaterFlowProblem: Problem<PacificAtlanticWaterFlowParams> = {
  id: "pacific-atlantic-water-flow",
  title: title,
  codeRaw: codeRaw,
  getInput: getInput,
  generateSteps: generateSteps,
  variableMetadata: variableMetadata,
  variableGroups: variableGroups,
  tags: ["graph", "dfs", "bfs", "matrix"], // Added relevant tags
};
