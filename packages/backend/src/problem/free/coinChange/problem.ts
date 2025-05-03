import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { code } from "./code/typescript";
import { CoinChangeInput } from "./types";
import { testcases } from "./testcase";

type CoinChangeInputType = [number[], number];

const title = "Coin Change";

export const problem: Problem<[number[], number], ProblemState> = {
  title: title,
  emoji: "🪙",
  code: code,
  func: (input: CoinChangeInputType) => generateSteps(...input),
  testcases,
  id: "coin-change",
  tags: ["dynamic programming"],
  metadata: {
    variables: variableMetadata,
    groups: groups,
  },
};
