import { generateSteps } from "./steps";
import { testcases } from "./testcase";

describe("Valid Anagram", () => {
  testcases.forEach((testcase, index) => {
    it(`Testcase ${index + 1}: ${testcase.description}`, () => {
      const input = testcase.input;
      const steps = generateSteps(input);
      const finalState = steps[steps.length - 1];
      const resultVariable = finalState.variables.find(
        (v) => (v as any).name === "result"
      );
      expect((resultVariable as any).value).toBe(testcase.expected);
    });
  });
});
