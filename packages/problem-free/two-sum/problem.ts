import { Problem, ProblemState } from "@algolens/core/src/types";

import { variables } from "./variables";
import { generateSteps } from "./steps";
import { twoSumInput } from "./types";
import { groups } from "./groups";
import { testcases } from "./testcase";

export const problem: Problem<twoSumInput, ProblemState> = {
  title: "Two Sum",
  emoji: "🎯",
  func: (i) => generateSteps(i.nums, i.target), // Use the imported step generation function
  id: "two-sum",
  difficulty: "easy",
  metadata: {
    variables, // Use the imported variables
    groups, // Use the imported groups
  },
  testcases: testcases, // Use the imported testcases
  codegen: {
    signature: "twoSum(nums: number[], target: number): number[]",
  },
};
