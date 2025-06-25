import { it } from "bun:test";
import { problem } from "./problem"; // Import the problem definition
import { runTests } from "algo-lens-core/src/test"; // Import the test runner utility

it(problem.id, async () => {
  await runTests(__dirname);
});
