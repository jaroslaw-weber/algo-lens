import { test } from "bun:test"; // Assuming bun:test based on project structure
import { generateSteps } from "./steps";
import { testcases } from "./testcase";
import { problem } from "./problem";
import { runTests } from "../../core/test";

test(problem.id, () => {
  runTests(problem);
});
