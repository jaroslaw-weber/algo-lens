import { defineProblem } from "@problem/types/problem";
import { generateSteps } from "./steps";
import { variables } from "./variables";
import { groups } from "./groups";
import { testcases } from "./testcase";
import { SumOfTwoIntegersInput } from "./types";

export const problem = defineProblem<SumOfTwoIntegersInput>({
  id: "sum-of-two-integers", // Assuming this ID is appropriate
  title: "Sum of Two Integers",
  emoji: "➕",
  tags: ["Bit Manipulation", "Math"],
  difficulty: "Medium", // Difficulty might vary, setting a default
  generateSteps: generateSteps,
  metadata: {
    variables: variables,
    groups: groups,
  },
  testcases: testcases,
});
