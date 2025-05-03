import { testCases } from './testcase';
import { wordBreakProblem } from './problem';
import { StepLoggerV2 } from '@algo-lens/problem-template';
import { Problem } from 'algo-lens-core';
import { WordBreakInput } from './types'; // Import input type

describe('Word Break Problem', () => {
  // Test the step generation logic
  testCases.forEach(({ input, output: expectedOutput }, index) => {
    it(`should generate correct steps and final result for test case ${index + 1}`, () => {
      const steps = wordBreakProblem.generateSteps(input);
      expect(steps).toBeDefined();
      expect(steps.length).toBeGreaterThan(0); // Basic check

      // Check the final result in the steps' variables
      const lastStep = steps[steps.length - 1];
      // Assuming the final result is stored in a variable named 'result'
      const finalResultVar = lastStep.variables.find(v => v.name === 'result');
      expect(finalResultVar).toBeDefined();
      expect(finalResultVar?.type).toBe('BOOLEAN');
      if(finalResultVar?.type === 'BOOLEAN') {
         expect(finalResultVar.value).toEqual(expectedOutput);
      }
    });
  });

  // Optional: Test basic problem metadata
  it('should have correct problem metadata', () => {
    expect(wordBreakProblem.id).toBe('word-break');
    expect(wordBreakProblem.title).toBe('Word Break');
    expect(wordBreakProblem.tags).toEqual(["Array", "Hash Table", "String", "Dynamic Programming", "Trie", "Memoization"]);
  });

  // Test the reference solution logic directly (simulating generateSteps)
  testCases.forEach(({ input, output: expectedOutput }, index) => {
      it(`reference solution logic should return correct output for test case ${index + 1}`, () => {
          const { s, wordDict } = input;
          const n = s.length;
          const wordDictSet = new Set(wordDict);
          const dp = new Array(n + 1).fill(false);
          dp[0] = true;

          for (let i = 1; i <= n; i++) {
              for (let j = 0; j < i; j++) {
                  const word = s.substring(j, i);
                  if (dp[j] && wordDictSet.has(word)) {
                      dp[i] = true;
                      break;
                  }
              }
          }
          const actualOutput = dp[n];
          expect(actualOutput).toEqual(expectedOutput);
      });
  });

});
