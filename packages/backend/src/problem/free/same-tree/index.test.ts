import { problem } from "./problem";
import { runTests } from "../../core/test";
import { it } from "bun:test";

it(problem.id, async () => {
  await runTests(problem);
});
