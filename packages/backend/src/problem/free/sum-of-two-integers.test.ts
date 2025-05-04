import { it } from "bun:test";
import { problem } from "./sum-of-two-integers"; // Import from the sibling .ts file
import { runTests } from "../core/test"; // Adjust path relative to the new test file

it(problem.id, () => {
  runTests(problem);
});
