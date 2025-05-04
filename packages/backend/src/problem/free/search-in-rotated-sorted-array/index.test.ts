import { it } from "bun:test";
import { problem } from "./problem"; // Import from problem.ts
import { runTests } from "../core/test"; // Adjust path relative to the new test file

it(problem.id, () => {
  runTests(problem);
});
