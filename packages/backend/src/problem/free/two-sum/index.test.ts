import { testCases } from './testcase';
import { twoSumProblem } from './problem';
import { StepLoggerV2 } from '@algo-lens/problem-template';
import { Problem } from 'algo-lens-core';

describe('Two Sum Problem', () => {
  // Test the step generation logic
  testCases.forEach(({ input, output }, index) => {
    it(`should generate correct steps for test case ${index + 1}`, () => {
      const steps = twoSumProblem.generateSteps(input);
      // Add specific assertions about the generated steps if needed
      // For example, check the number of steps, or the final state
      expect(steps).toBeDefined();
      expect(steps.length).toBeGreaterThan(0);

      // Check if the final step contains the correct result (if applicable)
      // Note: The exact structure of the final step depends on implementation
      // This is a placeholder assertion
      // const lastStep = steps[steps.length - 1];
      // const resultVar = lastStep.variables.find(v => v.name === 'result');
      // expect(resultVar?.value).toEqual(expect.arrayContaining(output)); // Use arrayContaining for flexible order
    });
  });

  // Optional: Test the visualizer configurations
  it('should have valid visualizer configurations', () => {
    expect(twoSumProblem.visualizers).toBeDefined();
    expect(twoSumProblem.visualizers.length).toBeGreaterThan(0);
    twoSumProblem.visualizers.forEach(vis => {
      expect(vis.id).toBeDefined();
      expect(vis.name).toBeDefined();
      expect(vis.elements).toBeDefined();
      expect(vis.elements.length).toBeGreaterThan(0);
    });
  });

  // Optional: Test basic problem metadata
  it('should have correct problem metadata', () => {
    expect(twoSumProblem.id).toBe('two-sum');
    expect(twoSumProblem.title).toBe('Two Sum');
    expect(twoSumProblem.tags).toEqual(['Array', 'Hash Table']); // Ensure tags match
  });

  // Test the reference solution function directly (using StepLoggerV2 output)
  // This requires the original function used within generateSteps to be exported or accessible
  // Assuming the logic within generateSteps correctly calls the core algorithm
  testCases.forEach(({ input, output }, index) => {
    it(`reference solution should return correct output for test case ${index + 1}`, () => {
        const l = new StepLoggerV2();
        const seen = new Map<number, number>();
        l.array('nums', input.nums);
        l.simple('target', input.target);
        l.hashmap('seen', seen);
        l.snapshot('Initial state');
        l.breakpoint(1); // Corresponds to //#1

        let actualOutput: number[] | undefined;

        for (let i = 0; i < input.nums.length; i++) {
            const num = input.nums[i];
            const complement = input.target - num;
            l.simple('i', i);
            l.simple('complement', complement);
            l.array('nums', input.nums, { ptr: i, label: 'i' });
            l.snapshot(`Checking index ${i}`);
            l.breakpoint(2); // Corresponds to //#2

            if (seen.has(complement)) {
                const complementIndex = seen.get(complement)!;
                actualOutput = [complementIndex, i];
                l.array('result', actualOutput);
                l.snapshot(`Found pair: [${complementIndex}, ${i}]`);
                l.breakpoint(3); // Corresponds to //#3
                break; // Exit loop once found
            }
            seen.set(num, i);
            l.hashmap('seen', seen, { key: num, label: 'Added' });
            l.snapshot(`Added ${num} to seen map`);
            l.breakpoint(4); // Corresponds to //#4 (after adding to map)
        }

        if (!actualOutput) {
           // Handle case where no solution is found, though problem statement guarantees one.
           // This part might not be reached based on problem constraints.
           l.breakpoint(5); // Corresponds to //#5 (end/no solution)
           actualOutput = []; // Or throw error, depending on desired behavior
        }

        // Sort both arrays to ensure consistent order for comparison
        const sortedActual = [...actualOutput].sort((a, b) => a - b);
        const sortedExpected = [...output].sort((a, b) => a - b);

        expect(sortedActual).toEqual(sortedExpected);
    });
});


});
