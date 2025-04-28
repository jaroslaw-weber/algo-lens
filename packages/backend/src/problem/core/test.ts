import { Problem } from "algo-lens-core";
import { cloneDeep } from "lodash";
import { describe, it, expect } from "bun:test";

export function runTests(problem: Problem<any, any>) {
	for (const testCase of problem.testCases) {
	  const input = cloneDeep(testCase.input);
	  const expected = cloneDeep(testCase.expected);
	  const states = problem.func(input);
  
	  expect(states).toEqual(expected);
	}
	
  }