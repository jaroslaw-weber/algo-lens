// Placeholder for the main problem definition
import { Problem } from "algo-lens-core";
import { NumberOfIslandsParams } from "./types";
import { codeRaw } from "./code";
import { generateSteps } from "./steps";
import { variableMetadata } from "./variables";
import { variableGroups } from "./groups";

const title = "Number of Islands";

const getInput = (): NumberOfIslandsParams => ({
  grid: [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ],
});

export const numberOfIslandsProblem: Problem<NumberOfIslandsParams> = {
  id: "number-of-islands",
  title: title,
  codeRaw: codeRaw,
  getInput: getInput,
  generateSteps: generateSteps,
  variableMetadata: variableMetadata,
  variableGroups: variableGroups,
  tags: ["graph", "dfs", "bfs"], // Added dfs/bfs tag based on common solution
};
