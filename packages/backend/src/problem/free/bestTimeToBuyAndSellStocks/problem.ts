import { Problem, ProblemState } from "algo-lens-core";
import { variableMetadata } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { code } from "./code";
import { MaxProfitInput } from "./types";
import { maxProfitTestCases } from './testcase';


const title = "Best Time to Buy and Sell Stock";

export const problem: Problem<MaxProfitInput, ProblemState> = {
  title: title,
  code: code,
  func: generateSteps,
  id: "best-time-to-buy-and-sell-stock",
  testCases: maxProfitTestCases,
  tags: ["dynamic programming"],
  metadata: {
    variables: variableMetadata,
    groups: groups,
  },
};
