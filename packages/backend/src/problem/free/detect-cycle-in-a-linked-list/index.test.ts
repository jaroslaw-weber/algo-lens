import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { ProblemState } from "../../../../algo-lens-core/types/core"; // Assuming this path is correct for ProblemState

describe("Detect Cycle in a Linked List", () => {
  testcases.forEach((testcase) => {
    it(`Test Case ${testcase.id}: ${testcase.description}`, () => {
      const steps: ProblemState[] = generateSteps(testcase.input);
      const lastStep = steps[steps.length - 1];
      const resultVariable = lastStep.variables.find(
        (v) => v.label === "Result"
      );
      expect(resultVariable?.value).toBe(testcase.expected);
    });
  });
});
