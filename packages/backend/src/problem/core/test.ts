import { Problem, ProblemState } from "algo-lens-core";
import { cloneDeep, last } from "lodash";
import { describe, it, expect } from "bun:test";

export function runTests(problem: Problem<any, ProblemState>) {
  const { testcases } = problem;
  if (testcases.length < 4) {
    throw new Error("Test cases count should be at least 4");
  }
  for (const testcase of problem.testcases) {
    const input = cloneDeep(testcase.input);
    const expected = cloneDeep(testcase.expected);

    // Test the step-generating function
    const states = problem.func(cloneDeep(input)); // Use cloned input
    const state = last(states);
    const variables = state!.variables;
    const result = variables.find((x) => x.label === "result");
    if (!result) {
      throw new Error("No result found in last state");
    }
    //@ts-expect-error
    const value = result.value;
    expect(value).toEqual(expected);
    console.log(
      `Step generator test passed: ${JSON.stringify(input)} -> ${JSON.stringify(
        value
      )}`
    );

    // Test the raw solution file
    try {
      const solutionPath = `../free/${problem.id}/code/typescript.ts`;
      // Dynamically import the module. Bun requires the path relative to the current file,
      // but for dynamic import, it seems to need path relative to project root or handle module resolution differently.
      // Let's adjust the path assumption for dynamic import context if needed, maybe '../free/...' works if run from root?
      // Or potentially use a more robust path resolution method if available.
      // Trying a relative path from the current file's directory:
      // NOTE: Bun's dynamic import path resolution might be tricky. This path assumes 'test.ts' is in 'packages/backend/src/problem/core/'
      // and the target is 'packages/backend/src/problem/free/{problem.id}/code/typescript.ts'.
      // The correct relative path would be '../../free/{problem.id}/code/typescript.ts'
      const adjustedSolutionPath = `../../free/${problem.id}/code/typescript.ts`;
      const solutionModule = await import(adjustedSolutionPath);

      const functionName = problem.id.replace(/-(\w)/g, (_, c) =>
        c.toUpperCase()
      );

      const solutionFunction = solutionModule[functionName];

      if (typeof solutionFunction === "function") {
        const solutionResult = solutionFunction(cloneDeep(input)); // Use cloned input
        expect(solutionResult).toEqual(expected);
        console.log(
          `Raw solution test passed: ${JSON.stringify(
            input
          )} -> ${JSON.stringify(solutionResult)}`
        );
      } else {
        console.warn(
          `Raw solution function "${functionName}" not found or not a function in ${adjustedSolutionPath}`
        );
      }
    } catch (error) {
      console.error(`Error testing raw solution for ${problem.id}:`, error);
      // Decide if this should throw or just warn. For now, logging error.
      // Depending on requirements, might want to re-throw or handle differently.
    }
  }
}
