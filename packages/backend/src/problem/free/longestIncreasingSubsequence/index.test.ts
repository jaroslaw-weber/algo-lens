import { test } from "bun:test";
import { problem } from "./problem";
import { runTests } from "../../core/test";

test(problem.id, () => {
  runTests(problem);
})
