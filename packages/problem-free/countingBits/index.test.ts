import { it } from "bun:test";
import { problem } from "./problem";
import { runTests } from "algo-lens-core/src/test";

it(problem.id, async () => {
  await runTests(__dirname);
});
