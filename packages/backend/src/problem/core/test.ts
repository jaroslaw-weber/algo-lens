import { Problem, ProblemState } from "algo-lens-core";
import { cloneDeep, last } from "lodash";
import { describe, it, expect } from "bun:test";

export function runTests(problem: Problem<any, ProblemState>) {
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
  }
}
