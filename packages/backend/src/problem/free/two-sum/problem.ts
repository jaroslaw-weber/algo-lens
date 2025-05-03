import { Problem, ProblemState } from "algo-lens-core";
import { variables } from "./variables";
import { generateSteps } from "./steps";
import { TwoSumInput } from "./types";
import { groups } from "./groups"; 
import { testcases } from "./testcase"; 

export const problem: Problem<TwoSumInput, ProblemState> = {
  title: "Two Sum",
  emoji: '🎯',
  func: generateSteps, // Use the imported step generation function
  id: "two-sum",
  tags: ["array", "hash set"],
  metadata: { 
    variables, // Use the imported variables
    groups, // Use the imported groups
  },
  testcases: testcases, // Use the imported testcases
  // Note: The 'code' property is intentionally removed.
};
