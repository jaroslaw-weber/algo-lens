import { Problem, ProblemState } from "algo-lens-core";
import { variables } from "./variables";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { productExceptSelf as code } from "./code/typescript";
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
    signature: "function productExceptSelf(nums: number[]): number[]",
  },
};
