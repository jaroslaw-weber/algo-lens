import { defineTestcase } from "@problem/types/testcase";
import { SumOfTwoIntegersInput } from "./types"; // Assuming types.ts will define this

export const testcases = [
  defineTestcase<SumOfTwoIntegersInput>({
    title: "Test Case 1: Positive Numbers",
    input: { a: 1, b: 2 },
    output: 3,
  }),
  defineTestcase<SumOfTwoIntegersInput>({
    title: "Test Case 2: Positive and Negative",
    input: { a: -1, b: 1 },
    output: 0,
  }),
  defineTestcase<SumOfTwoIntegersInput>({
    title: "Test Case 3: Zero",
    input: { a: 0, b: 0 },
    output: 0,
  }),
  defineTestcase<SumOfTwoIntegersInput>({
    title: "Test Case 4: Negative Numbers",
    input: { a: -5, b: -3 },
    output: -8, // Sum of -5 and -3 is -8
  }),
  defineTestcase<SumOfTwoIntegersInput>({
    title: "Test Case 5: Larger Numbers",
    input: { a: 10, b: 15 },
    output: 25,
  }),
];
