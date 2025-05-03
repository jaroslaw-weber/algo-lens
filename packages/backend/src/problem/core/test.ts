import { Problem, ProblemState } from "algo-lens-core";
import { cloneDeep, last } from "lodash";
import { describe, it, expect } from "bun:test";

export function runTests(problem: Problem<any, ProblemState>) {
  const { testcases, metadata } = problem;

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
    const states = problem.func(input);
    const state = last(states);
    const variables = state!.variables;
    const result = variables.find((x) => x.label === "result");
    if (!result) {
      throw new Error("No result found in last state");
    }
    //@ts-expect-error
    const value = result.value;
    expect(value).toEqual(expected);
    /** 
    console.log(
      `Test case passed: ${JSON.stringify(input)} -> ${JSON.stringify(value)}`
    );
    **/
  }
}
