import { Problem, ProblemState } from "algo-lens-core/src/types";
import { generateSteps } from "./steps";
import { groups } from "./groups";
import { variables } from "./variables";
import { testcases } from "./testcase"; // Import test cases

// Defines the interface for the input expected by the generateSteps function
interface SumOfTwoIntegersInput {
  a: number;
  b: number;
}

// asBinary function removed - no longer needed here.

// sumOfTwoIntegers function removed - logic moved to steps.ts

// code variable removed - no longer needed here.

// Export the complete problem setup
// Note: The second type argument is ProblemState[], as generateSteps returns an array of states.
export const problem: Problem<SumOfTwoIntegersInput, ProblemState[]> = {
  title: "Sum of Two Integers",
  emoji: "➕",
  // The func now calls generateSteps with the input parameters a and b.
  func: (p: SumOfTwoIntegersInput) => generateSteps(p.a, p.b),
  id: "sum-of-two-integers",
  tags: ["bit manipulation"],
  difficulty: "easy",
  codegen: { // Renamed from codeGenConfig
    signature: "getSum(a: number, b: number): number", // Renamed from targetFunctionSignature
  },
  metadata: {
    groups: groups,
    variables: variables,
  },
  testcases, // Add test cases
};
