import { it } from "bun:test";
import { problem } from "./problem";
import { runTests } from "../../core/test"; // Assuming runTests is in core/test

it(problem.id, async () => {
  // The runTests function likely handles comparing the final state
  // of the 'matrix' variable in the generated steps against the 'expected'
  // value defined in each testcase.
  await runTests(problem);
});
