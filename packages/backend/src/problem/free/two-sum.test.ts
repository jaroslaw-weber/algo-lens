import { describe, it, expect } from "bun:test";
import { problem } from "./two-sum";

describe("Two Sum Problem Definition", () => {
  it("should have a non-empty code string representation", () => {
    expect(typeof problem.code).toBe("string");
    expect(problem.code.length).toBeGreaterThan(0);
  });
});
