import * as ts from "typescript";
import { Problem, ProblemState } from "algo-lens-core";
import { cloneDeep, last } from "lodash";
import { describe, it, expect } from "bun:test";
import * as fs from "fs";
import * as path from "path";

export async function runTests(problem: Problem<any, ProblemState>) {
  const { testcases, metadata } = problem;

  // Construct the path to the TypeScript file
  const tsFilePath = path.join(
    process.cwd(), // Assuming the test runs from the repo root
    "src",
    "problem",
    "free",
    problem.id,
    "code",
    "typescript.ts"
  );

  // Check if the TypeScript file exists
  if (fs.existsSync(tsFilePath)) {
    // Dynamically import the TypeScript file
    const module = await import(tsFilePath);

    // Check specifically for a default export that is a function
    if (module.default && typeof module.default === 'function') {
      //@ts-expect-error Assigning the user's function to func2 for testing
      problem.func2 = module.default;
    } else {
      // Throw an error if a default function export is not found
      throw new Error(`Expected a default function export in ${tsFilePath}`);
    }

    // Ensure func2 was successfully assigned
    if (!problem.func2) {
      // This check might seem redundant due to the throw above, but serves as a safeguard
      throw new Error(`Could not load function from ${tsFilePath}`);
    }
  } else {
    // Throw an error if the TypeScript file doesn't exist
    throw new Error(
      `Error: TypeScript file not found for problem ${problem.id} at ${tsFilePath}`
    );
  }

  // --- Metadata Checks ---
  if (!metadata) {
    throw new Error("No metadata found in problem.");
  }
  const { groups, variables } = metadata;
  if (!groups) {
    throw new Error("No groups found in metadata");
  }
  if (!variables) {
    throw new Error("No variables found in metadata");
  }
  if (!variables.length) {
    throw new Error("No variables found in metadata");
  }
  // --- End Metadata Checks ---

  // Ensure func2 is loaded before attempting to run tests
   if (!problem.func2) {
     // This check is crucial before the test loop
     throw new Error(`Function func2 not loaded correctly for problem ${problem.id}`);
   }


  if (testcases.length < 4) {
    throw new Error("Test cases count should be at least 4");
  }

  // --- Test Execution ---
  // Use describe to group all tests for this problem
  describe(`Tests for problem ${problem.id}`, () => {
    // Iterate through each testcase
    problem.testcases.forEach((testcase, index) => {
      // Use 'it' for each individual test case
      it(`Testcase ${index + 1}`, () => {
        // Deep clone input and expected output to prevent modification
        const input = cloneDeep(testcase.input);
        const expected = cloneDeep(testcase.expected);

        // Execute the user's imported function (problem.func2)
        const func = problem.func2;
        // Assuming func2 directly takes the input array/object and returns the result
        const resultValue = func(input);

        // Assert that the actual result matches the expected result
        expect(resultValue).toEqual(expected);
      });
    });
  });
  // --- End Test Execution ---
}
