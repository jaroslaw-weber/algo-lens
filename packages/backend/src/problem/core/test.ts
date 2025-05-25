import * as ts from "typescript";
import { Problem, ProblemState } from "algo-lens-core";
import { cloneDeep, last, isEqual } from "lodash";
import { describe, it, expect } from "bun:test";
import { loadProblemWithId } from "./load";

export async function runTests(problem: Problem<any, ProblemState>) {
  // problem = cloneDeep(problem);
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
  if (!testcases) {
    throw new Error("No test cases found in problem");
  }

  if (testcases.length < 4) {
    throw new Error("Test cases count should be at least 4");
  }
  for (let i = 0; i < problem.testcases.length; i++) {
    const testcase = problem.testcases[i];
    const input = cloneDeep(testcase.input);
    const expected = cloneDeep(testcase.expected);
    const func = problem.func;
    //for (const func of [problem.func]) {
    const states = func(input);

    const state = last(states);
    const variables = state!.variables;
    const result = variables.find((x) => x.label === "result");
    if (!result) {
      throw new Error("No result found in last state");
    }
    // Explicitly check for 'value' property existence
    const value = result.hasOwnProperty("value")
      ? //@ts-expect-error
        result.value
      : //@ts-expect-error
        result.values;
    ////
    if (!isEqual(value, expected)) {
      console.error(
        `Test case #${i} failed. Description: ${testcase.description}`
      );
      console.log("testcases", testcases);
      console.log("input", input);
      console.error("value", value);
      console.error("expected", expected);
      console.log("first state", states[0]);
    }
    expect(value).toEqual(expected);
    const loaded = await loadProblemWithId(problem.id);
    const code = loaded?.code;
    expect(code).toBeTruthy();

    expect(code!.includes("FORMATTING ERROR")).toBeFalse();
    expect(code!.includes("l.getSteps")).toBeFalse();
    expect(code!.includes(`l.array`)).toBeFalse();
    expect(code!.includes("l.comment")).toBeFalse();
    /**
    // 
      `Test case passed: ${JSON.stringify(input)} -> ${JSON.stringify(
        value
      )}`
    );
    **/
    //}
  }
}
