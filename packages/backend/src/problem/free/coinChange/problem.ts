import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { code } from "./code";
import { CoinChangeInput } from "./types";
import { coinChangeTestCases } from './testcase';

const title = "Coin Change";

export const problem: Problem<CoinChangeInput, ProblemState> = {
  title: title,
  emoji: '🪙',
  code: code,
  func: generateSteps, // Use generateSteps from steps.ts
  testCases: coinChangeTestCases,
  id: "coin-change",
  tags: ["dynamic programming"],
  metadata: {
    variables: variableMetadata,
    groups: groups,
  },
};
