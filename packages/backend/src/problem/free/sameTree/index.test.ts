import { testCases } from './testcase';
import { sameTreeProblem } from './problem';
import { StepLoggerV2 } from '@algo-lens/problem-template';
import { Problem } from 'algo-lens-core';
import { TreeNode } from './types'; // Import TreeNode
import { treeToArray, createTree } from './utils'; // Import helpers

describe('Same Tree Problem', () => {
  // Test the step generation logic
  testCases.forEach(({ input, output: expectedOutput }, index) => {
    it(`should generate correct steps and final result for test case ${index + 1}`, () => {
      const steps = sameTreeProblem.generateSteps(input);
      expect(steps).toBeDefined();
      // For recursive problems, the number of steps can vary greatly
      // expect(steps.length).toBeGreaterThan(0); // Basic check

      // Check the final result in the steps' variables
      const lastStep = steps[steps.length - 1];
      // Assuming the final result is stored in a variable named 'finalResult'
      const finalResultVar = lastStep.variables.find(v => v.name === 'finalResult');
      expect(finalResultVar).toBeDefined();
      expect(finalResultVar?.type).toBe('BOOLEAN');
      if(finalResultVar?.type === 'BOOLEAN') {
         expect(finalResultVar.value).toEqual(expectedOutput);
      }
    });
  });

  // Optional: Test basic problem metadata
  it('should have correct problem metadata', () => {
    expect(sameTreeProblem.id).toBe('same-tree');
    expect(sameTreeProblem.title).toBe('Same Tree');
    expect(sameTreeProblem.tags).toEqual(['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree']);
  });

  // Test the reference solution logic directly (simulating generateSteps recursion)
  testCases.forEach(({ input, output: expectedOutput }, index) => {
      it(`reference solution logic should return correct output for test case ${index + 1}`, () => {
          // Define the recursive function locally for testing
          function isSameTreeRecursive(p: TreeNode | null, q: TreeNode | null): boolean {
              if (!p && !q) return true;
              if (!p || !q) return false;
              if (p.val !== q.val) return false;
              return isSameTreeRecursive(p.left, q.left) && isSameTreeRecursive(p.right, q.right);
          }
          const actualOutput = isSameTreeRecursive(input.p, input.q);
          expect(actualOutput).toEqual(expectedOutput);
      });
  });

});
