import { problem } from "./problem";
import { testcases } from "./testcase";
import { generateSteps } from "./steps"; // Import the actual function
import { runTests } from "../../core/test";
import { test } from "bun:test";

test(problem.id, () => {
  runTests(problem);
});
