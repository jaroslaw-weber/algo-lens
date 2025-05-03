import { testCases } from './testcase';
import { searchRotatedSortedArrayProblem } from './problem';
import { StepLoggerV2 } from '@algo-lens/problem-template';
import { Problem } from 'algo-lens-core';
import { SearchRotatedSortedArrayInput } from './types'; // Import input type

describe('Search in Rotated Sorted Array Problem', () => {
  // Test the step generation logic
  testCases.forEach(({ input, output: expectedOutput }, index) => {
    it(`should generate correct steps and final result for test case ${index + 1}`, () => {
      const steps = searchRotatedSortedArrayProblem.generateSteps(input);
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
    expect(searchRotatedSortedArrayProblem.id).toBe('search-in-rotated-sorted-array');
    expect(searchRotatedSortedArrayProblem.title).toBe('Search in Rotated Sorted Array');
    expect(searchRotatedSortedArrayProblem.tags).toEqual(['Array', 'Binary Search']);
  });

  // Test the reference solution logic directly (simulating generateSteps)
  testCases.forEach(({ input, output: expectedOutput }, index) => {
      it(`reference solution logic should return correct output for test case ${index + 1}`, () => {
          const { nums, target } = input;
          let left = 0;
          let right = nums.length - 1;
          let actualOutput = -1;

          while (left <= right) {
              const mid = Math.floor((left + right) / 2);
              if (nums[mid] === target) {
                  actualOutput = mid;
                  break; // Exit loop once found
              }

              if (nums[left] <= nums[mid]) { // Left half sorted
                  if (nums[left] <= target && target < nums[mid]) {
                      right = mid - 1;
                  } else {
                      left = mid + 1;
                  }
              } else { // Right half sorted
                  if (nums[mid] < target && target <= nums[right]) {
                      left = mid + 1;
                  } else {
                      right = mid - 1;
                  }
              }
          }
          // If loop finishes without finding, actualOutput remains -1

          expect(actualOutput).toEqual(expectedOutput);
      });
  });

});
