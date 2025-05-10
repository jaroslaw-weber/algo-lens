import { Problem, ProblemState } from "algo-lens-core";
import { variables } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { testcases } from "./testcase";
import { CountBitsInput } from "./types";

const title = "Counting Bits";

export const problem: Problem<CountBitsInput, ProblemState> = {
  title: title,
  emoji: "🧮",
  func: generateSteps,
  testcases,
  id: "countingBits",
  tags: ["dynamic programming", "bit manipulation"],
  difficulty: "easy",
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "function countBits(n: number): number[]",
  },
};
