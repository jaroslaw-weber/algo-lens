import { it } from "bun:test";
import { problem } from "./problem";
import { runTests } from "../../core/test";

it("course-schedule", () => {
  runTests(problem);
});
