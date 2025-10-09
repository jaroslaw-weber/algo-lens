import { Problem, ProblemState } from "@algolens/core/src/types";

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
  difficulty: "easy",
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "countBits(n: number): number[]",
  },
};
