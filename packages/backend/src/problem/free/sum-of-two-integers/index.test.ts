import { it } from "bun:test";
import { problem } from "./problem"; // Import from the new problem.ts file
import { runTests } from "../../core/test"; // Adjust path relative to the new test file location

it(problem.id, () => {
  runTests(problem);
});
