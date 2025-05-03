import { testCases } from './testcase';
import { productOfArrayExceptSelfProblem } from './problem';
import { StepLoggerV2 } from '@algo-lens/problem-template';
import { Problem } from 'algo-lens-core';

describe('Product of Array Except Self Problem', () => {
  // Test the step generation logic
  testCases.forEach(({ input, output }, index) => {
    it(`should generate correct steps for test case ${index + 1}`, () => {
      const steps = productOfArrayExceptSelfProblem.generateSteps(input);
      expect(steps).toBeDefined();
      expect(steps.length).toBeGreaterThan(0);

      // Check the final result in the steps
      const lastStep = steps[steps.length - 1];
      const resultVar = lastStep.variables.find(v => v.name === 'result');
      // Check if the result array exists and matches the expected output
      expect(resultVar).toBeDefined();
      expect(resultVar?.type).toBe('ARRAY');
      if (resultVar?.type === 'ARRAY') {
         expect(resultVar.value).toEqual(output);
      }
    });
  });

  // Optional: Test the visualizer configurations
  it('should have valid visualizer configurations', () => {
    expect(productOfArrayExceptSelfProblem.visualizers).toBeDefined();
    expect(productOfArrayExceptSelfProblem.visualizers.length).toBeGreaterThan(0);
    productOfArrayExceptSelfProblem.visualizers.forEach(vis => {
      expect(vis.id).toBeDefined();
      expect(vis.name).toBeDefined();
      expect(vis.elements).toBeDefined();
      expect(vis.elements.length).toBeGreaterThan(0);
    });
  });

  // Optional: Test basic problem metadata
  it('should have correct problem metadata', () => {
    expect(productOfArrayExceptSelfProblem.id).toBe('product-of-array-except-self');
    expect(productOfArrayExceptSelfProblem.title).toBe('Product of Array Except Self');
    expect(productOfArrayExceptSelfProblem.tags).toEqual(['Array', 'Prefix Sum']);
  });

  // Test the reference solution logic directly by simulating generateSteps
  testCases.forEach(({ input, output: expectedOutput }, index) => {
      it(`reference solution logic should return correct output for test case ${index + 1}`, () => {
          const { nums } = input;
          const n = nums.length;
          const prefix = new Array(n).fill(1);
          const suffix = new Array(n).fill(1);
          const result = new Array(n).fill(1);

          // Prefix pass
          for (let i = 1; i < n; i++) {
              prefix[i] = prefix[i - 1] * nums[i - 1];
          }

          // Suffix pass
          for (let i = n - 2; i >= 0; i--) {
              suffix[i] = suffix[i + 1] * nums[i + 1];
          }

          // Final calculation
          for (let i = 0; i < n; i++) {
              result[i] = prefix[i] * suffix[i];
          }

          expect(result).toEqual(expectedOutput);
      });
  });

});
