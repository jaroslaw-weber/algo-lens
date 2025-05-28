import { describe, it, expect } from "bun:test";
import { solution } from "./steps";
import { testcases } from "./testcase";

describe("Meeting Rooms", () => {
  it("should return false for overlapping intervals", () => {
    const intervals = [
      [0, 30],
      [5, 10],
      [15, 20],
    ];
    expect(solution(intervals)).toBe(false);
  });

  it("should return true for non-overlapping intervals", () => {
    const intervals = [
      [7, 10],
      [2, 4],
    ];
    expect(solution(intervals)).toBe(true);
  });

  // Use testcases from testcase.ts
  testcases.forEach((testcase, index) => {
    it(`should pass testcase ${index + 1}`, () => {
      expect(solution(testcase.input.intervals)).toBe(testcase.expected);
    });
  });
});
