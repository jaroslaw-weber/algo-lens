import { describe, it, expect } from "bun:test";
import { threeSum } from "./code"; // Assuming the function is exported from code.ts
import { threeSumTestCases } from "./testcase";

// Helper function to sort the result for consistent comparison
const sortResult = (result: number[][]): number[][] => {
  // Sort numbers within each triplet
  const sortedTriplets = result.map(triplet => [...triplet].sort((a, b) => a - b));
  // Sort the array of triplets based on the first number, then second, then third
  sortedTriplets.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    if (a[1] !== b[1]) return a[1] - b[1];
    return a[2] - b[2];
  });
  return sortedTriplets;
};

describe("3 Sum Problem", () => {
  threeSumTestCases.forEach((testCase, index) => {
    it(`Test Case ${index + 1}: should return correct triplets for input ${JSON.stringify(testCase.nums)}`, () => {
      const result = threeSum(testCase.nums);
      const sortedResult = sortResult(result);
      const sortedExpected = sortResult(testCase.expected);
      expect(sortedResult).toEqual(sortedExpected);
    });
  });
});
