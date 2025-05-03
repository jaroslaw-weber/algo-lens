import { problem } from "./problem";
import { ProblemState, BooleanGroupVariable } from "algo-lens-core";
import * as TestCases from "./testcase"; // Import all test case functions

// Helper function to get the final result from the steps
const getFinalResult = (steps: ProblemState[]): boolean | undefined => {
  if (!steps || steps.length === 0) return undefined;
  const lastStep = steps[steps.length - 1];
  const resultVar = lastStep.variables.find(
    (v) => v.label === "is node same?" && v.type === "boolean-group"
  ) as BooleanGroupVariable | undefined;
  // Assuming the boolean group for result has a single entry labelled 'return'
  return resultVar?.data.find(d => d.label === 'return')?.value;
};

describe("Same Tree Problem", () => {
  it("should return true for identical simple trees", () => {
    const input = TestCases.getIdenticalSimpleTrees();
    const steps = problem.func(input);
    expect(steps.length).toBeGreaterThan(0); // Ensure steps were generated
    const finalResult = getFinalResult(steps);
    expect(finalResult).toBe(true);
  });

  it("should return false for trees with same structure but different values", () => {
    const input = TestCases.getDifferentValuesTrees();
    const steps = problem.func(input);
    expect(steps.length).toBeGreaterThan(0);
    const finalResult = getFinalResult(steps);
    expect(finalResult).toBe(false);
  });

  it("should return false for trees with different structures", () => {
    const input = TestCases.getDifferentStructureTrees();
    const steps = problem.func(input);
    expect(steps.length).toBeGreaterThan(0);
    const finalResult = getFinalResult(steps);
    expect(finalResult).toBe(false);
  });

  it("should return true when both trees are null", () => {
    const input = TestCases.getBothNullTrees();
    const steps = problem.func(input);
    expect(steps.length).toBeGreaterThan(0);
    const finalResult = getFinalResult(steps);
    expect(finalResult).toBe(true);
  });

  it("should return false when the first tree is null and the second is not", () => {
    const input = TestCases.getOneNullPTrees();
    const steps = problem.func(input);
    expect(steps.length).toBeGreaterThan(0);
    const finalResult = getFinalResult(steps);
    expect(finalResult).toBe(false);
  });

   it("should return false when the second tree is null and the first is not", () => {
    const input = TestCases.getOneNullQTrees();
    const steps = problem.func(input);
    expect(steps.length).toBeGreaterThan(0);
    const finalResult = getFinalResult(steps);
    expect(finalResult).toBe(false);
  });

  it("should return true for identical complex trees", () => {
    const input = TestCases.getIdenticalComplexTrees();
    const steps = problem.func(input);
    expect(steps.length).toBeGreaterThan(0);
    const finalResult = getFinalResult(steps);
    expect(finalResult).toBe(true);
  });

  it("should return false for different complex trees", () => {
    const input = TestCases.getDifferentComplexTrees(); // Uses the original test case logic
    const steps = problem.func(input);
    expect(steps.length).toBeGreaterThan(0);
    const finalResult = getFinalResult(steps);
    expect(finalResult).toBe(false);
  });
});
