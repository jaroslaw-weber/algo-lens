import { it } from "bun:test";
import { problem } from "./problem";
import { runTests } from "../../core/test";

it("containsDuplicate", () => {
  // Assuming runTests can handle comparing final ProblemState variables
  runTests(problem);
});
