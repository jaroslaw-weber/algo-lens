import { problem } from "./problem";
import { runTests } from "../../core/test";
import { test } from "bun:test";

test(problem.id, () => {
  runTests(problem);
});
