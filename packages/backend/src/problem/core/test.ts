import * as ts from "typescript";
import { Problem, ProblemState } from "algo-lens-core";
import { cloneDeep, last } from "lodash";
import { describe, it, expect } from "bun:test";
import * as fs from "fs";
import * as path from "path";

export async function runTests(problem: Problem<any, ProblemState>) {
  const { testcases, metadata } = problem;

  // Check for TypeScript file existence
  const tsFilePath = path.join(
    process.cwd(), // Assuming the test runs from the repo root
    "src",
    "problem",
    "free",
    problem.id,
    "code",
    "typescript.ts"
  );

  if (fs.existsSync(tsFilePath)) {
    // Dynamically import the JavaScript file
    const jsFilePath = tsFilePath;
    if (!fs.existsSync(jsFilePath)) {
      throw new Error(
        `JavaScript file not found for problem ${problem.id} at ${jsFilePath}`
      );
    }

    const module = await import(jsFilePath);
    const exportedFunctions = Object.values(module);
    if (
      exportedFunctions.length !== 1 ||
      typeof exportedFunctions[0] !== "function"
    ) {
      throw new Error(`Expected a single function export in ${jsFilePath}`);
    }
    //@ts-expect-error
    problem.func2 = exportedFunctions[0];
  } else {
    throw new Error(
      `Warning: TypeScript file not found for problem ${problem.id} at ${tsFilePath}`
    );
  }

  //has metadata check
  if (!metadata) {
    throw new Error("No metadata found in problem. ");
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

  if (testcases.length < 4) {
    throw new Error("Test cases count should be at least 4");
  }
  for (const testcase of problem.testcases) {
    const input = cloneDeep(testcase.input);
    const expected = cloneDeep(testcase.expected);
    for (const func of [problem.func]) {
      const states = func(input);

      const state = last(states);
      const variables = state!.variables;
      const result = variables.find((x) => x.label === "result");
      if (!result) {
        throw new Error("No result found in last state");
      }
      //@ts-expect-error
      const value = result.value ?? result.values;
      expect(value).toEqual(expected);
      /**
    console.log(
      `Test case passed: ${JSON.stringify(input)} -> ${JSON.stringify(
        value
      )}`
    );
    **/
    }
  }
}
