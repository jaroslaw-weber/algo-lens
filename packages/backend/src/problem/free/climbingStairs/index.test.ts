import { it } from "bun:test";
import { problem } from "./problem"; // Assuming problem definition is exported from problem.ts
import { runTests } from "../../core/test";

it("climbingStairs", () => {
  runTests(problem); // Pass both problem and testcases to runTests
});
