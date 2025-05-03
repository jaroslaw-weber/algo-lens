import { testCases } from './testcase';
import { sumOfTwoIntegersProblem } from './problem';
import { StepLoggerV2 } from '@algo-lens/problem-template';
import { Problem } from 'algo-lens-core';
import { SumOfTwoIntegersInput } from './types'; // Import input type

describe('Sum of Two Integers Problem', () => {
  // Test the step generation logic
  testCases.forEach(({ input, output: expectedOutput }, index) => {
    it(`should generate correct steps and final sum for test case ${index + 1}`, () => {
      const steps = sumOfTwoIntegersProblem.generateSteps(input);
      expect(steps).toBeDefined();
      expect(steps.length).toBeGreaterThan(0); // Basic check

      // Check the final result in the steps' variables
      const lastStep = steps[steps.length - 1];
      // Assuming the final sum is stored in variable 'a' at the end
      const finalSumVar = lastStep.variables.find(v => v.name === 'a');
      expect(finalSumVar).toBeDefined();
      expect(finalSumVar?.type).toBe('SIMPLE'); // Or 'BINARY' if that's how it's stored
      if(finalSumVar?.type === 'SIMPLE' || finalSumVar?.type === 'BINARY') {
         expect(finalSumVar.value).toEqual(expectedOutput);
      }
    });
  });

  // Optional: Test basic problem metadata
  it('should have correct problem metadata', () => {
    expect(sumOfTwoIntegersProblem.id).toBe('sum-of-two-integers');
    expect(sumOfTwoIntegersProblem.title).toBe('Sum of Two Integers');
    expect(sumOfTwoIntegersProblem.tags).toEqual(["Bit Manipulation", "Math"]);
  });

  // Test the reference solution logic directly (simulating generateSteps)
  testCases.forEach(({ input, output: expectedOutput }, index) => {
      it(`reference solution logic should return correct output for test case ${index + 1}`, () => {
          let { a, b } = input;
          while (b !== 0) {
              const carry = a & b;
              a = a ^ b;
              b = carry << 1;
          }
          const actualOutput = a;
          expect(actualOutput).toEqual(expectedOutput);
      });
  });

});
