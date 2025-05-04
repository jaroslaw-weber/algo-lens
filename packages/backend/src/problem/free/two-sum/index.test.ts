import { it } from "bun:test"; // Assuming bun:test based on project structure
import { problem } from "./problem";
import { runTests } from "../../core/test";

it(problem.id, () => {
  runTests(problem);
});
