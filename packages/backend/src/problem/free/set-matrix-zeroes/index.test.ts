import { it } from "bun:test";
import { problem } from "./problem";
import { runTests } from "../../core/test"; // Assuming runTests is in core/test

it(problem.id, async () => {
  await runTests(problem);
});
