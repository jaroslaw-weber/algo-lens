import { ProblemState } from 'algo-lens-core';

// Generic TestCase interface
export interface TestCase<TInput, TExpected> {
  input: TInput;
  expectedOutput: TExpected;
}

// Comparison function with specific handling for number[][]
function compareOutputs<TExpected>(actual: TExpected, expected: TExpected): boolean {
  // Handle potential null/undefined cases
  if (actual === null || actual === undefined || expected === null || expected === undefined) {
    return actual === expected;
  }

  // Specific comparison for number[][] (like 3Sum output)
  if (Array.isArray(actual) && Array.isArray(expected) &&
      actual.every(item => Array.isArray(item) && item.every(num => typeof num === 'number')) &&
      expected.every(item => Array.isArray(item) && item.every(num => typeof num === 'number')))
  {
      // Type assertion needed here because TS doesn't automatically know it's number[][]
      const actualSorted = (actual as number[][])
          .map(triplet => [...triplet].sort((a, b) => a - b)) // Sort inner arrays
          .sort((a, b) => { // Sort outer array based on sorted triplets
              for (let i = 0; i < Math.min(a.length, b.length); i++) {
                  if (a[i] !== b[i]) {
                      return a[i] - b[i];
                  }
              }
              return a.length - b.length;
          });

      const expectedSorted = (expected as number[][])
          .map(triplet => [...triplet].sort((a, b) => a - b)) // Sort inner arrays
          .sort((a, b) => { // Sort outer array based on sorted triplets
              for (let i = 0; i < Math.min(a.length, b.length); i++) {
                  if (a[i] !== b[i]) {
                      return a[i] - b[i];
                  }
              }
              return a.length - b.length;
          });

      return JSON.stringify(actualSorted) === JSON.stringify(expectedSorted);
  }

  // Default comparison for other types (can be expanded)
  // For primitive types or objects where direct stringify works
  try {
      return JSON.stringify(actual) === JSON.stringify(expected);
  } catch (e) {
      // Fallback for complex objects or types that JSON.stringify might fail on
      return actual === expected;
  }
}

// Generic test runner function
export async function runProblemTests<TInput, TExpected>(
  problemFunction: (input: TInput) => ProblemState[],
  testCases: TestCase<TInput, TExpected>[]
): Promise<void> { // Return Promise<void> as it's async and logs to console

  console.log(`\nRunning ${testCases.length} test cases...`);

  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    console.log(`\n--- Test Case ${i + 1} ---`);
    console.log("Input:", testCase.input);

    try {
      const states = problemFunction(testCase.input);

      if (!states || states.length === 0) {
        console.error(`Test Case ${i + 1}: FAILED - No states returned by the problem function.`);
        continue; // Move to the next test case
      }

      const lastState = states[states.length - 1];
      const resultVariable = lastState?.variables.find(v => v.label === 'result');

      if (!resultVariable) {
          // Check if expected output is also considered 'empty' (e.g., [], null, undefined)
          // This handles cases where the function correctly returns no result when expected
          const expectedIsEmpty = testCase.expectedOutput === null ||
                                  testCase.expectedOutput === undefined ||
                                  (Array.isArray(testCase.expectedOutput) && testCase.expectedOutput.length === 0);

          if (expectedIsEmpty) {
              console.log(`Test Case ${i + 1}: SUCCESS (No 'result' variable found, and expected output was empty)`);
          } else {
              console.error(`Test Case ${i + 1}: FAILED - 'result' variable not found in the last state.`);
              console.log("Expected:", testCase.expectedOutput);
              console.log("Last State Variables:", lastState?.variables);
          }
        continue;
      }

      // Assuming resultVariable.value can be directly cast to TExpected.
      // More robust handling might be needed depending on actual ProblemState structure.
      const actualOutput = resultVariable.value as TExpected;

      const success = compareOutputs(actualOutput, testCase.expectedOutput);

      console.log(`Test Case ${i + 1}: ${success ? 'SUCCESS' : 'FAILED'}`);

      if (!success) {
        console.log("Expected:", JSON.stringify(testCase.expectedOutput, null, 2));
        console.log("Actual:  ", JSON.stringify(actualOutput, null, 2));
        // Optionally log the full last state for debugging failed cases
        // console.log("Last State:", JSON.stringify(lastState, null, 2));
      }

    } catch (error) {
        console.error(`Test Case ${i + 1}: FAILED - Error during execution:`, error);
        console.log("Input:", testCase.input);
        console.log("Expected:", testCase.expectedOutput);
    }
  }
  console.log("\n--- Test Execution Finished ---");
}
