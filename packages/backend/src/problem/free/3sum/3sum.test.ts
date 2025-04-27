import { describe, it, expect } from 'bun:test'; // Changed import to bun:test
import { runProblemTests } from '../../core/test-runner';
import { threeSumProblem } from './problem';

// Type check to ensure the imported problem has the necessary properties
// This helps catch errors if the problem definition changes.
if (!threeSumProblem || typeof threeSumProblem.func !== 'function' || !Array.isArray(threeSumProblem.testCases)) {
  throw new Error('Imported threeSumProblem is not correctly structured or is missing required properties (func, testCases).');
}

describe('Three Sum Problem Tests', () => {
  // Timeout might need adjustment depending on the complexity and number of test cases
  it('should pass all defined test cases', async () => {
    // Call the generic test runner with the problem's function and test cases
    // runProblemTests logs details for each test case
    const allTestsPassed = await runProblemTests(
      threeSumProblem.func,
      threeSumProblem.testCases
    );

    // Assert that the overall result from runProblemTests is true
    expect(allTestsPassed).toBe(true);
  }, 30000); // Example: Set timeout to 30 seconds
});
