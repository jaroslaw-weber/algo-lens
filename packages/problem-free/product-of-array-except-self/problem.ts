import { Problem, ProblemState } from "algo-lens-core/src/types";

import { variables } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { ProductExceptSelfInput } from "./types";
import { testcases } from "./testcase";

const title = "Product of Array Except Self";
const emoji = "✖️";
const id = "product-of-array-except-self";
const tags = ["array", "prefix sum"];

export const problem: Problem<ProductExceptSelfInput, ProblemState> = {
  id,
  title,
  emoji,
  tags,
  difficulty: "easy",
  func: generateSteps,
  testcases,
  metadata: {
    variables,
    groups,
  },
  codegen: {
    signature: "productExceptSelf(nums: number[]): number[]",
  },
};
