import { problem } from "./problem";
import { runTests } from "@algolens/core/src/test";
import { it } from "bun:test";

it(problem.id, async () => {
  await runTests(__dirname);
});
