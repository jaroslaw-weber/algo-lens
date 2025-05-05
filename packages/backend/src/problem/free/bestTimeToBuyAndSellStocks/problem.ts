import { Problem, ProblemState } from "algo-lens-core";
import { variables } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { MaxProfitInput } from "./types";
import { testcases } from "./testcase";

const title = "Best Time to Buy and Sell Stock";

export const problem: Problem<MaxProfitInput, ProblemState> = {
  title: title,
  emoji: "📈",
  func: generateSteps,
  id: "bestTimeToBuyAndSellStocks",
  difficulty: "easy",
  testcases,
  tags: ["array"],
  metadata: {
    variables,
    groups,
  },
};
