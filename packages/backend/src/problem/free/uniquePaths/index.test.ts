import { testCases } from './testcase';
import { uniquePathsProblem } from './problem';
import { StepLoggerV2 } from '@algo-lens/problem-template';
import { Problem } from 'algo-lens-core';
import { UniquePathsInput } from './types'; // Import input type

describe('Unique Paths Problem', () => {
  // Test the step generation logic
  testCases.forEach(({ input, output: expectedOutput }, index) => {
    it(`should generate correct steps and final result for test case ${index + 1}`, () => {
      const steps = uniquePathsProblem.generateSteps(input);
      expect(steps).toBeDefined();
      expect(steps.length).toBeGreaterThan(0); // Basic check

      // Check the final result in the steps' variables
      const lastStep = steps[steps.length - 1];
      // Assuming the final result is stored in a variable named 'result'
      const finalResultVar = lastStep.variables.find(v => v.name === 'result');
      expect(finalResultVar).toBeDefined();
      expect(finalResultVar?.type).toBe('SIMPLE');
      if(finalResultVar?.type === 'SIMPLE') {
         expect(finalResultVar.value).toEqual(expectedOutput);
      }
    });
  });

  // Optional: Test basic problem metadata
  it('should have correct problem metadata', () => {
    expect(uniquePathsProblem.id).toBe('unique-paths');
    expect(uniquePathsProblem.title).toBe('Unique Paths');
    expect(uniquePathsProblem.tags).toEqual(["Math", "Dynamic Programming", "Combinatorics", "Array"]);
  });

  // Test the reference solution logic directly (simulating generateSteps)
  testCases.forEach(({ input, output: expectedOutput }, index) => {
      it(`reference solution logic should return correct output for test case ${index + 1}`, () => {
          const { m, n } = input;
          if (m <= 0 || n <= 0) {
              expect(0).toEqual(expectedOutput); // Or handle as per expected behavior for invalid input
              return;
          }
          const dp: number[][] = Array.from({ length: m }, () => Array(n).fill(0));

          for (let i = 0; i < m; i++) {
              dp[i][0] = 1;
          }
          for (let j = 0; j < n; j++) {
              dp[0][j] = 1;
          }

          for (let i = 1; i < m; i++) {
              for (let j = 1; j < n; j++) {
                  dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
              }
          }
          const actualOutput = dp[m - 1][n - 1];
          expect(actualOutput).toEqual(expectedOutput);
      });
  });

});
