import { it } from "bun:test";
import { problem } from "./wordBreak"; // Import from the sibling .ts file
import { runTests } from "../../core/test"; // Adjust path relative to the new test file

it(problem.id, () => {
  runTests(problem);
});
