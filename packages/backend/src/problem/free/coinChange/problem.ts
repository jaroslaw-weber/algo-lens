import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { code } from "./code/typescript";
import { CoinChangeInput } from "./types";
import { testcases } from "./testcase";

const title = "Coin Change";

export const problem: Problem<[number[], number], ProblemState> = {
  title: title,
  emoji: "🪙",
  code: code,
  func: (input: [number[], number]) => generateSteps(input[0], input[1]),
  testcases,
  id: "coin-change",
  tags: ["dynamic programming"],
  metadata: {
    variables: variableMetadata,
    groups: groups,
  },
};
