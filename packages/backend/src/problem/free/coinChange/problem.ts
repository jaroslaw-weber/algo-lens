import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { code } from "./code";
import { CoinChangeInput } from "./types";

const title = "Coin Change";
const getInput = () => ({ coins: [1, 2, 5], target: 11 });

export const problem: Problem<CoinChangeInput, ProblemState> = {
  title: title,
  code: code,
  getInput: getInput,
  func: generateSteps, // Use generateSteps from steps.ts
  id: "coin-change",
  tags: ["dynamic programming"],
  tested: true,
  metadata: {
    variables: variableMetadata,
    groups: groups,
  },
};
