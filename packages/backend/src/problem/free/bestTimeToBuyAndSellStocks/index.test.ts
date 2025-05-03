import { it } from "bun:test";
import { problem } from "./problem"; // Assuming problem definition is exported from problem.ts
import { runTests } from "../../core/test";
import { testcases } from "./testcase"; // Import the renamed testcases

it("bestTimeToBuyAndSellStocks", () => {
  runTests(problem); // Pass both problem and testcases to runTests
});
