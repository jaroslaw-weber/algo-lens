import { Problem, ProblemState } from "algo-lens-core/src/types";

import { variables } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { CoinChangeInput } from "./types";
import { testcases } from "./testcase";

const title = "Coin Change";

export const problem: Problem<CoinChangeInput, ProblemState> = {
  title: title,
  emoji: "🪙",
  func: (input) => generateSteps(...input),
  difficulty: "medium",
  testcases,
  id: "coinChange",
  tags: ["dynamic programming", "array"],
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "coinChange(coins: number[], amount: number): number",
  },
};
