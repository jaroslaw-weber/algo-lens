import { Problem, ProblemState } from "@algolens/core/src/types";
import { describe, it, expect } from "bun:test";

import _ from "lodash";
import { loadProblemFromPath } from "./load";
const { cloneDeep, isEqual, last } = _;
// Helper function to recursively remove 'id' properties
function stripIds(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(stripIds);
  }
  if (typeof obj === "object" && obj !== null) {
    const newObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (key !== "id") {
        newObj[key] = stripIds(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}
export async function runTests(problemFolder: string) {
  const problem = await loadProblemFromPath(problemFolder);

  if (!problem) {
    throw new Error("invalid problem folder structure");
  }

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
    console.log("test #" + (i + 1));
    const testcase = problem.testcases[i];
    const input = cloneDeep(testcase.input);
    let expected = cloneDeep(testcase.expected);
    expected = stripIds(expected); // Apply stripIds to expected as well
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
    const cleanedValue = stripIds(value); // Apply the helper function

    if (!isEqual(cleanedValue, expected)) {
      // Compare cleanedValue
      console.error(
        `Test case #${i} failed. Description: ${testcase.description}`
      );
      console.log("testcases", testcases);
      console.log("input", input);
      console.error("value", cleanedValue); // Log cleanedValue
      console.error("expected", expected);
      console.log("first state", states[0]);
    }
    expect(cleanedValue).toEqual(expected); // Compare cleanedValue
    const code = problem?.code;
    expect(code).toBeTruthy();
    expect(code?.includes("logger."), "use l. instead of logger.").toBeFalse();

    expect(code?.includes(" function function")).toBeFalse();

    expect(
      code!.includes("FORMATTING ERROR"),
      "formatting error! code: \n" + code
    ).toBeFalse();
    expect(code!.includes("l.getSteps")).toBeFalse();
    expect(code!.includes(`function generateSteps`)).toBeFalse();
    expect(code!.includes(`function getSteps(`)).toBeFalse();
    expect(code!.includes(`l.array`)).toBeFalse();
    expect(code!.includes("l.comment")).toBeFalse();
    expect(code!.includes("return result")).toBeTrue();
  }
}
