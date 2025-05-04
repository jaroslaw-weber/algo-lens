import { it } from "bun:test";
import { problem } from "./search-in-rotated-sorted-array"; // Import from the sibling .ts file
import { runTests } from "../core/test"; // Adjust path relative to the new test file

it(problem.id, () => {
  runTests(problem);
});
