import { it } from "bun:test";
import { problem } from "./problem"; // Import the problem definition
import { runTests } from "../../core/test"; // Import the test runner utility

it(problem.id, async () => {
  await runTests(problem);
});
